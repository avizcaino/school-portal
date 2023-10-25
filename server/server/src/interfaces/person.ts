import {Entity} from './entity';

export interface Person extends Entity {
  documentId: string;
  name: string;
  firstSurname: string;
  secondSurname?: string;
}
