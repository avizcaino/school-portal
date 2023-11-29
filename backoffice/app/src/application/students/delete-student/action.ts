import {Mediator} from 'mediatr-ts';
import {DeleteStudentCommand} from './command';

export const deleteStudent = (id: string) => new Mediator().send(new DeleteStudentCommand(id));
