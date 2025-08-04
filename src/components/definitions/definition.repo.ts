import { injectable } from 'inversify';
import { promises as fsPromises } from 'fs';
import { AppPlatform } from '@src/components/config/config.interface';
import { DefinitionModel } from '@src/components/definitions/definition.model';
import { flatten } from 'lodash';

@injectable()
export class DefinitionRepository {
  private readonly collectionPath = './db/definitions.json';

  /**
   * Depending on used data source here we'll support search conditions
   */
  public async getAll(): Promise<DefinitionModel[]> {
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
