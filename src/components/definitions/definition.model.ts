import { Platformable, Versionable } from '@src/types/common';

/**
 * If we have db connection here we'll have ORM model class
 */
export interface DefinitionModel extends Versionable, Platformable {
  hash: string;
}
