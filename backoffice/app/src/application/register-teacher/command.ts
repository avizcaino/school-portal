import {ITeacherExtended} from '@school-server/server';
import {TeacherValidator} from '@school-shared/core';
import {IRequest} from 'mediatr-ts';

export class RegisterTeacherCommand
  extends TeacherValidator
  implements IRequest<ITeacherExtended> {}
