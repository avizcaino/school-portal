import {Entity} from './entity';
import {Person} from './person';

export type TeacherGroup = {[groupdId: string]: {tutor: boolean}};

export interface Teacher extends Person, Entity {
  groups: TeacherGroup[];
}
