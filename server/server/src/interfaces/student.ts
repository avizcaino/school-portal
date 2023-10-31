import {ID} from './entity';
import {IGroup} from './group';
import {Person} from './person';

export interface IStudent extends Person {
  birthDate: Date;
  group: ID | IGroup;
}

export interface IStudentExtended extends Omit<IStudent, 'group'> {
  group: IGroup;
}

export interface IStudentAttendanceRecord {
  date: Date;
  present: boolean;
}
