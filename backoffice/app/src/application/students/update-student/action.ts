import {ITeacher, ITeacherExtended} from '@school-shared/core';
import {Mediator} from 'mediatr-ts';
import {UpdateTeacherCommand} from './command';

export const updateTeacher = (id: string, teacher: ITeacher): Promise<ITeacherExtended> =>
  new Mediator().send(new UpdateTeacherCommand(id, teacher));
