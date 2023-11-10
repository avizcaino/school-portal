import {ITeacherExtended, TeachersBackendAdapter} from '@school-shared/core';
import {NotificationService} from '@uxland/react-services';
import {AxiosError} from 'axios';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {UpdateTeacherCommand} from './command';

@injectable()
export class UpdateTeacherCommandHandler
  implements IRequestHandler<UpdateTeacherCommand, ITeacherExtended>
{
  constructor(
    @inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter,
    @inject(NotificationService) protected notificationService: NotificationService
  ) {}

  async handle(value: UpdateTeacherCommand): Promise<ITeacherExtended> {
    try {
      await this.backendAdapter.updateTeacher(value.id, value.data);
      return await this.backendAdapter.getTeacher(value.id);
    } catch (error: any) {
      this.notificationService.notifyError(
        (error as AxiosError<Error>).response?.data?.message || error.message
      );
      return Promise.reject(error);
    }
  }
}
