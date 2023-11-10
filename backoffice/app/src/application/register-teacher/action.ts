import {ITeacher, ITeacherExtended} from '@school-shared/core';
import {Mediator} from 'mediatr-ts';
import {RegisterTeacherCommand} from './command';

export const registerTeacher = (teacher: ITeacher): Promise<ITeacherExtended> =>
  new Mediator().send(new RegisterTeacherCommand(teacher));
