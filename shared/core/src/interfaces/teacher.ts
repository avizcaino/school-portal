import {ID} from './entity';
import {IGroup} from './group';
import {Person} from './person';

export interface ITeacher extends Person {
  groups?: ID[];
}

export interface ITeacherExtended extends Omit<ITeacher, 'groups'> {
  groups?: IGroup[];
}
