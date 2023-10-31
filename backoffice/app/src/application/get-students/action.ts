import {IStudent} from '@school-server/server';
import {Mediator} from 'mediatr-ts';
import {StudentsQuery} from './query';

export const fetchStudents = (): Promise<IStudent[]> => new Mediator().send(new StudentsQuery());
