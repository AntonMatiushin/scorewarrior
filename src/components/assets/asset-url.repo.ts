import { injectable } from 'inversify';
import { promises as fsPromises } from 'fs';
import { AssetUrlModel } from '@src/components/assets/asset-url.model';

@injectable()
export class AssetUrlRepository {
  private readonly collectionPath = './db/assets_urls.json';

  /**
   * Depending on used data source here we'll support search conditions
   */
  public async getAll(): Promise<AssetUrlModel[]> {
    const buffer = await fsPromises.readFile(this.collectionPath, {
      encoding: 'utf-8',
    });
    const parsed = JSON.parse(buffer.toString());
    return parsed.assets_urls;
  }
}
