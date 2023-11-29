import {ID} from './entity';
import {IGroup} from './group';
import {Person} from './person';

export interface IStudent extends Person {
  birthDate: Date;
  group: ID;
}

export interface IStudentExtended extends Person {
  group: IGroup;
}

export interface IStudentAttendanceRecord {
  date: Date;
  present: boolean;
}
