import {ID} from './entity';
import {IGroup} from './group';
import {Person} from './person';

export interface IStudent extends Person {
  birthDate: Date;
  group: ID | IGroup; // TODO: this must be only ID[]
}

export interface IStudentExtended extends Omit<IStudent, 'group'> {
  group: IGroup;
}

export interface IStudentAttendanceRecord {
  date: Date;
  present: boolean;
}
