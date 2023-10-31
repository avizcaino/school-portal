import {IStudentExtended} from '@school-server/server';
import {Mediator} from 'mediatr-ts';
import {StudentsQuery} from './query';

export const fetchStudents = (): Promise<IStudentExtended[]> =>
  new Mediator().send(new StudentsQuery());
