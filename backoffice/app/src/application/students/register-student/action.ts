import {IStudent, IStudentExtended} from '@school-shared/core';
import {Mediator} from 'mediatr-ts';
import {RegisterStudentCommand} from './command';

export const registerStudent = (student: IStudent): Promise<IStudentExtended[]> =>
  new Mediator().send(new RegisterStudentCommand(student));
