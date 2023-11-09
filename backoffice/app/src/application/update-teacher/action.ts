import {ITeacherExtended} from '@school-server/server';
import {Mediator} from 'mediatr-ts';
import {UpdateTeacherCommand} from './command';

export const updateTeacher = (id: string, teacher: ITeacherExtended) =>
  new Mediator().send(new UpdateTeacherCommand(id, teacher));
