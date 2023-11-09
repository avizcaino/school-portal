import {ITeacher} from '@school-server/server';
import {Mediator} from 'mediatr-ts';
import {RegisterTeacherCommand} from './command';

export const registerTeacher = (teacher: ITeacher): Promise<string> =>
  new Mediator().send(new RegisterTeacherCommand(teacher));
