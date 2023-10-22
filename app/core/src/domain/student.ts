import {Entity} from './entity';
import {Person} from './person';

export interface Student extends Person, Entity {
  birthDate: Date;
}
