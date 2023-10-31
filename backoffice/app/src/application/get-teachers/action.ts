import {ITeacherExtended} from '@school-server/server';
import {Mediator} from 'mediatr-ts';
import {TeachersQuery} from './query';

export const fetchTeachers = (): Promise<ITeacherExtended[]> =>
  new Mediator().send(new TeachersQuery());
