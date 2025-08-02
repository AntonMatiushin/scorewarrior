import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from '@src/ioc/types';
import express, { Express } from 'express';
import { BaseApi, ILogger } from '@src/types/common';
import { GeneralConfig } from '@src/config/config.interface';
import {
  createErrorHandlerMiddleware,
  createIncomingRequestMiddleware,
  createLogResponseMiddleware,
} from '@src/helpers/common.helper';

@injectable()
export class Application {
  constructor(
    @inject(TYPES.Core.Config) protected config: GeneralConfig,
    @inject(TYPES.Core.Logger.Console) protected logger: ILogger,
    @inject(TYPES.Apis.General) protected api: BaseApi,
  ) {}

  private app: Express;
  private server: Server;

  public start(): void {
    this.logger.info(JSON.stringify(this.config, null, 2));
    this.app = express();
    this.app.use(express.json());
    this.app.use(createIncomingRequestMiddleware(this.logger));
    this.app.use('/', this.api.getRouter());
    this.app.use(createLogResponseMiddleware(this.logger));
    this.app.use(createErrorHandlerMiddleware(this.logger));

    const { port } = this.config.server;
    this.server = this.app.listen(port, () => {
      this.logger.info(`Service is listening at http://localhost:${port}`);
    });
  }

  public stop(): void {
    this.server.close();
  }

  public get express(): Express {
    return this.app;
  }
}
