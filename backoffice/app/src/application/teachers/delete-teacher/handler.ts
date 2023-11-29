import {TeachersBackendAdapter} from '@school-shared/core';
import {NotificationService} from '@uxland/react-services';
import {AxiosError} from 'axios';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {fetchTeachers} from '../get-teachers/action';
import {DeleteTeacherCommand} from './command';

@injectable()
export class DeleteTeacherCommandHandler implements IRequestHandler<DeleteTeacherCommand, boolean> {
  constructor(
    @inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter,
    @inject(NotificationService) protected notificationService: NotificationService
  ) {}

  async handle(value: DeleteTeacherCommand): Promise<boolean> {
    try {
      const result = await this.backendAdapter.deleteTeacher(value.id);
      if (result) await fetchTeachers();
      return result;
    } catch (error: any) {
      this.notificationService.notifyError(
        (error as AxiosError<Error>).response?.data?.message || error.message
      );
      return Promise.reject(error);
    }
  }
}
