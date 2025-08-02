const TYPES = {
  Application: Symbol.for('application'),
  Core: {
    Config: Symbol.for('config'),
    Logger: {
      Console: Symbol.for('logger.console'),
    },
    Cache: {
      Config: Symbol.for('cache.config'),
    },
  },
  Apis: {
    General: Symbol.for('general.api'),
    Config: Symbol.for('config.api'),
  },
  Controllers: {
    Config: Symbol.for('config.controller'),
  },
  Services: {
    Config: Symbol.for('config.service'),
  },
  Repos: {
    Asset: Symbol.for('asset.repository'),
    AssetUrl: Symbol.for('asset-url.repository'),
    Definition: Symbol.for('definition.repository'),
    DefinitionUrl: Symbol.for('definition-url.repository'),
  },
};

export { TYPES };
