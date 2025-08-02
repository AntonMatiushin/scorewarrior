import { ConfigService as OriginalConfigService } from '@src/components/config/config.service';
import { injectable } from 'inversify';
import { AppPlatform } from '@src/components/config/config.interface';
import { AssetModel } from '@src/components/assets/asset.model';
import { DefinitionModel } from '@src/components/definitions/definition.model';

type ConfigServiceTest = {
  [Property in keyof OriginalConfigService]: OriginalConfigService[Property];
};

@injectable()
export class ConfigService implements ConfigServiceTest {
  public async determineAsset(
    version: string,
    platform: AppPlatform,
  ): Promise<AssetModel> {
    return await Promise.resolve({
      platform: AppPlatform.ANDROID,
      version: '13.2.528',
      hash: '828e6360af99ad85332c23c613a772d7392b9d0fadb70529d808d71e3f9b3a2f',
    });
  }

  public async determineDefinition(
    version: string,
    platform: AppPlatform,
  ): Promise<DefinitionModel> {
    return await Promise.resolve({
      platform: AppPlatform.IOS,
      version: '12.3.807',
      hash: '15ce021ae95ed3b1d352222176c58becd531d4cb0532e096f77cf1dd739f51b3',
    });
  }
}
