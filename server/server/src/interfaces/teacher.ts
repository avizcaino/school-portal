import {Entity, ID} from './entity';
import {Person} from './person';

export interface ITeacher extends Entity, Person {
  groups: ID[];
}
