import { inject, injectable } from 'inversify';
import { AssetModel } from '@src/components/assets/asset.model';
import { DefinitionModel } from '@src/components/definitions/definition.model';
import { AppPlatform } from '@src/components/config/config.interface';
import { TYPES } from '@src/ioc/types';
import { AssetRepository } from '@src/components/assets/asset.repo';
import { DefinitionRepository } from '@src/components/definitions/definition.repo';
import { Range, satisfies } from 'semver';
import { Platformable, Versionable } from '@src/types/common';

@injectable()
export class ConfigService {
  constructor(
    @inject(TYPES.Repos.Asset) protected assetRepo: AssetRepository,
    @inject(TYPES.Repos.Definition)
    protected definitionRepo: DefinitionRepository,
  ) {}

  private rules = {
    MAJOR: (v: string) => `~${v.split('.').at(0)}`,
    MINOR: (v: string) => {
      const [major, minor] = v.split('.');
      return `~${major}.${minor}`;
    },
  };

  public async determineAsset(
    version: string,
    platform: AppPlatform,
  ): Promise<AssetModel> {
    /**
     * Depending on data source here should be "where" supported by db
     */
    const allAssets = await this.assetRepo.getAll();
    return this.determine(allAssets, version, platform, this.rules.MAJOR);
  }

  public async determineDefinition(
    version: string,
    platform: AppPlatform,
  ): Promise<DefinitionModel> {
    /**
     * Depending on data source here should be "where" supported by db
     */
    const allDefinitions = await this.definitionRepo.getAll();
    return this.determine(allDefinitions, version, platform, this.rules.MINOR);
  }

  private determine<T extends Versionable & Platformable>(
    collection: T[],
    version: string,
    platform: AppPlatform,
    fallbackRule: (version) => string | Range,
  ): T {
    /**
     * As requested in task we check first the same version
     */
    const samePlatform = collection.filter((a) => a.platform === platform);
    const same = samePlatform.find((a) => satisfies(a.version, version));

    /**
     * and if it is not found we check fallback
     */
    return (
      same ??
      samePlatform.find((a) => satisfies(a.version, fallbackRule(version)))
    );
  }
}
