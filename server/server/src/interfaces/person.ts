import {Entity, Generic} from './entity';

export interface Person extends Entity, Generic {
  name: string;
  firstSurname: string;
  secondSurname?: string;
}
