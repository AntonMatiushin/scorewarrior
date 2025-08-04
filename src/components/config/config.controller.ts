import { pick } from "lodash";
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { makeController, validateInput } from '@src/helpers/common.helper';
import { EmptyObject } from '@src/types/common';
import { TYPES } from '@src/ioc/types';
import { GetConfigQueryParams } from '@src/components/config/config.interface';
import { GetConfigInputSchemaValidator } from '@src/components/config/config.validator';
import { ConfigService } from '@src/components/config/config.service';
import { GeneralConfig } from '@src/config/config.interface';
import { NotFoundError } from '@src/errors/errors.definitions';
import { AssetUrlRepository } from '@src/components/assets/asset-url.repo';
import { DefinitionUrlRepository } from '@src/components/definitions/definition-url.repo';
import NodeCache from 'node-cache';

@injectable()
export class ConfigController {
  constructor(
    @inject(TYPES.Core.Config) protected config: GeneralConfig,
    @inject(TYPES.Core.Cache.Config) protected configCache: NodeCache,
    @inject(TYPES.Services.Config) protected configService: ConfigService,
    @inject(TYPES.Repos.AssetUrl) protected assetUrlRepo: AssetUrlRepository,
    @inject(TYPES.Repos.DefinitionUrl)
    protected definitionUrlRepo: DefinitionUrlRepository,
  ) {}

  public get = makeController(
    async (
      req: Request<EmptyObject, EmptyObject, EmptyObject, GetConfigQueryParams>,
      res: Response,
    ) => {
      validateInput(req.query, GetConfigInputSchemaValidator);
      const hash = this.generateConfigHash(req.query);
      const cached = this.configCache.get(hash);
      if (cached) {
        return res.json(cached);
      }

      const { appVersion, platform } = req.query;
      const { versions, rpcUrls } = this.config;
      const [asset, definition] = await Promise.all([
        this.configService.determineAsset(appVersion, platform),
        this.configService.determineDefinition(appVersion, platform),
      ]);
      if (!asset || !definition) {
        throw new NotFoundError('Configuration not found');
      }

      const response = {
        version: versions,
        backend_entry_point: {
          jsonrpc_url: rpcUrls.backend,
        },
        assets: {
          ...pick(asset, 'version', 'hash'),
          urls: await this.assetUrlRepo.getAll(),
        },
        definitions: {
          ...pick(definition, 'version', 'hash'),
          urls: await this.definitionUrlRepo.getAll(),
        },
        notifications: {
          jsonrpc_url: rpcUrls.notifications,
        },
      };
      this.configCache.set(hash, response);

      return res.json(response);
    },
  );

  private generateConfigHash(query: GetConfigQueryParams) {
    const { appVersion, platform } = query;
    return `${platform}__${appVersion}`;
  }
}
