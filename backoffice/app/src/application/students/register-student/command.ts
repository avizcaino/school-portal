import {IStudentExtended, StudentValidator} from '@school-shared/core';
import {IRequest} from 'mediatr-ts';

export class RegisterStudentCommand
  extends StudentValidator
  implements IRequest<IStudentExtended[]> {}
