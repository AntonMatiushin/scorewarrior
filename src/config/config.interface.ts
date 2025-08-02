interface ServerConfig {
  port: number;
}

export interface GeneralConfig {
  env: string;
  server: ServerConfig;
  rpcUrls: {
    backend: string;
    notifications: string;
  };
  versions: {
    required: string;
    store: string;
  };
}
