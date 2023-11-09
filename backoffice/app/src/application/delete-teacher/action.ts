import {Mediator} from 'mediatr-ts';
import {DeleteTeacherCommand} from './command';

export const deleteTeacher = (id: string) => new Mediator().send(new DeleteTeacherCommand(id));
