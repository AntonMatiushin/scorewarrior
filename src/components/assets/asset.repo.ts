import { injectable } from 'inversify';
import { promises as fsPromises } from 'fs';
import { AssetModel } from '@src/components/assets/asset.model';
import { AppPlatform } from '@src/components/config/config.interface';
import { flatten } from 'lodash';

@injectable()
export class AssetRepository {
  private readonly collectionPath = './db/assets.json';

  /**
   * Depending on used data source here we'll support search conditions
   */
  public async getAll(): Promise<AssetModel[]> {
    const buffer = await fsPromises.readFile(this.collectionPath, {
      encoding: 'utf-8',
    });
    const parsed = JSON.parse(buffer.toString());
    return flatten(
      Object.values(AppPlatform).map((platform) => {
        return parsed[platform].map((i) => ({ ...i, platform }));
      }),
    );
  }
}
