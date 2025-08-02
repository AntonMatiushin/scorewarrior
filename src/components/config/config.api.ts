import { Router } from 'express';
import { inject, injectable, postConstruct } from 'inversify';
import { TYPES } from '@src/ioc/types';
import { BaseApi } from '@src/types/common';
import { ConfigController } from '@src/components/config/config.controller';

@injectable()
export class ConfigApi implements BaseApi {
  private router = Router();

  constructor(
    @inject(TYPES.Controllers.Config)
    protected configController: ConfigController,
  ) {}

  @postConstruct()
  protected init(): void {
    this.router.get('', this.configController.get);
  }

  public getRouter(): Router {
    return this.router;
  }
}
