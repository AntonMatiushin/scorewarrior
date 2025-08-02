import { injectable } from 'inversify';
import { promises as fsPromises } from 'fs';
import { DefinitionUrlModel } from '@src/components/definitions/definition-url.model';

@injectable()
export class DefinitionUrlRepository {
  private readonly collectionPath = './db/definitions_urls.json';

  public async getAll(): Promise<DefinitionUrlModel[]> {
    const buffer = await fsPromises.readFile(this.collectionPath, {
      encoding: 'utf-8',
    });
    const parsed = JSON.parse(buffer.toString());
    return parsed.definitions_urls;
  }
}
