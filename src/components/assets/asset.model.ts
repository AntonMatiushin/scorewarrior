import { Platformable, Versionable } from '@src/types/common';

/**
 * If we have db connection here we'll have ORM model class
 */
export interface AssetModel extends Versionable, Platformable {
  hash: string;
}
