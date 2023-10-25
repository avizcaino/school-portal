import {Entity, Generic} from './entity';

export interface Person extends Entity, Generic {
  documentId: string;
  name: string;
  firstSurname: string;
  secondSurname?: string;
}
