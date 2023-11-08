import {TeacherValidator} from '@school-shared/core';
import {IRequest} from 'mediatr-ts';

export class RegisterTeacherCommand extends TeacherValidator implements IRequest<string> {}
