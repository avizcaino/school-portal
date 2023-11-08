import {TeachersBackendAdapter} from '@school-server/server';
import {inject, injectable} from 'inversify';
import {IRequestHandler, requestHandler} from 'mediatr-ts';
import {RegisterTeacherCommand} from './command';

@injectable()
@requestHandler(RegisterTeacherCommand)
export class RegisterTeacherCommandHandler
  implements IRequestHandler<RegisterTeacherCommand, string>
{
  constructor(@inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter) {}

  handle(value: RegisterTeacherCommand): Promise<string> {
    return this.backendAdapter.registerTeacher(value);
  }
}
