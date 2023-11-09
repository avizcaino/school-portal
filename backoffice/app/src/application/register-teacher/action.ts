import {ITeacher, ITeacherExtended} from '@school-server/server';
import {Mediator} from 'mediatr-ts';
import {RegisterTeacherCommand} from './command';

export const registerTeacher = (teacher: ITeacher): Promise<ITeacherExtended> =>
  new Mediator().send(new RegisterTeacherCommand(teacher));
