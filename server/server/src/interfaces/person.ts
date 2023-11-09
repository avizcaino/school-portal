import {Entity, Generic} from './entity';

export interface Person extends Entity, Generic {
  internalId: string;
  name: string;
  firstSurname: string;
  secondSurname?: string;
  profilePic?: string;
}
