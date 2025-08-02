import { Container } from 'inversify';
import { TYPES } from './types';
import { Application } from '@src/app';
import { GeneralConfig } from '@src/config/config.interface';
import config from '@src/config/config';
import { ILogger } from '@src/types/common';
import { Api } from '@src/api';
import { AssetRepository } from '@src/components/assets/asset.repo';
import { AssetUrlRepository } from '@src/components/assets/asset-url.repo';
import { DefinitionRepository } from '@src/components/definitions/definition.repo';
import { DefinitionUrlRepository } from '@src/components/definitions/definition-url.repo';
import { ConfigService } from '@src/components/config/config.service';
import { ConfigController } from '@src/components/config/config.controller';
import { ConfigApi } from '@src/components/config/config.api';
import NodeCache from 'node-cache';

const container = new Container({
  defaultScope: 'Singleton',
});
container.bind<Application>(TYPES.Application).to(Application);
container.bind<GeneralConfig>(TYPES.Core.Config).toDynamicValue(() => {
  return config;
});
container.bind<ILogger>(TYPES.Core.Logger.Console).toDynamicValue(() => {
  return console;
});
container.bind<NodeCache>(TYPES.Core.Cache.Config).toDynamicValue(() => {
  return new NodeCache();
});

// Apis
container.bind<Api>(TYPES.Apis.General).to(Api);
container.bind<ConfigApi>(TYPES.Apis.Config).to(ConfigApi);

// Controllers
container.bind<ConfigController>(TYPES.Controllers.Config).to(ConfigController);

// Services
container.bind<ConfigService>(TYPES.Services.Config).to(ConfigService);

// Repos
container.bind<AssetRepository>(TYPES.Repos.Asset).to(AssetRepository);
container.bind<AssetUrlRepository>(TYPES.Repos.AssetUrl).to(AssetUrlRepository);
container
  .bind<DefinitionRepository>(TYPES.Repos.Definition)
  .to(DefinitionRepository);
container
  .bind<DefinitionUrlRepository>(TYPES.Repos.DefinitionUrl)
  .to(DefinitionUrlRepository);

// Mappers

export { container };
