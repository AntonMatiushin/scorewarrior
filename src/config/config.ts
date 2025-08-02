import Convict from 'convict';
import { config as dotenv } from 'dotenv';
import { GeneralConfig } from '@src/config/config.interface';

dotenv();

// Define a schema
const config = Convict<GeneralConfig>({
  env: {
    format: ['local', 'test', 'qa'],
    default: 'local',
    env: 'NODE_ENV',
  },
  server: {
    port: {
      doc: 'Http server port',
      default: 3000,
      env: 'SERVER_PORT',
    },
  },
  rpcUrls: {
    backend: {
      doc: 'BE entry point url',
      default: 'api.application.com/jsonrpc/v2',
      env: 'RPC_URLS_BACKEND',
    },
    notifications: {
      doc: 'Notifications url',
      default: 'notifications.application.com/jsonrpc/v1',
      env: 'RPC_URLS_NOTIFICATIONS',
    },
  },
  versions: {
    required: {
      doc: 'Min required app version',
      default: '12.2.423',
      env: 'VERSIONS_REQUIRED',
    },
    store: {
      doc: 'App version in store',
      default: '13.7.556',
      env: 'VERSIONS_STORE',
    },
  },
});

export default config.getProperties();
