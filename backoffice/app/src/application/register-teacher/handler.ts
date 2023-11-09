import {TeachersBackendAdapter} from '@school-server/server';
import {NotificationService} from '@uxland/react-services';
import {AxiosError} from 'axios';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {RegisterTeacherCommand} from './command';

@injectable()
export class RegisterTeacherCommandHandler
  implements IRequestHandler<RegisterTeacherCommand, string>
{
  constructor(
    @inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter,
    @inject(NotificationService) protected notificationService: NotificationService
  ) {}

  async handle(value: RegisterTeacherCommand): Promise<string> {
    try {
      return await this.backendAdapter.registerTeacher(value);
    } catch (error: any) {
      this.notificationService.notifyError(
        (error as AxiosError<Error>).response?.data?.message || error.message
      );
      return Promise.reject(error);
    }
  }
}
