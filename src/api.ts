import { inject, injectable, postConstruct } from 'inversify';
import { TYPES } from '@src/ioc/types';
import { Router } from 'express';
import { BaseApi } from '@src/types/common';

@injectable()
export class Api implements BaseApi {
  private router = Router();

  constructor(@inject(TYPES.Apis.Config) protected configApi: BaseApi) {}

  @postConstruct()
  protected init(): void {
    this.router.use('/config', this.configApi.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}
