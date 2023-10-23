import {Entity, ID} from './entity';
import {Person} from './person';

export interface IStudent extends Entity, Person {
  birthDate: Date;
  group: ID;
}
