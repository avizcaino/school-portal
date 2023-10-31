import {ID} from './entity';
import {IGroup} from './group';
import {Person} from './person';

export interface ITeacher extends Person {
  groups: ID[] | IGroup[]; // TODO: this must be only ID[]
}

export interface ITeacherExtended extends Omit<ITeacher, 'groups'> {
  groups: IGroup[];
}
