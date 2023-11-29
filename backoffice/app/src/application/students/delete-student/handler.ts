import {StudentsBackendAdapter} from '@school-shared/core';
import {NotificationService} from '@uxland/react-services';
import {AxiosError} from 'axios';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {fetchStudents} from '../get-students/action';
import {DeleteStudentCommand} from './command';

@injectable()
export class DeleteStudentCommandHandler implements IRequestHandler<DeleteStudentCommand, boolean> {
  constructor(
    @inject(StudentsBackendAdapter) protected backendAdapter: StudentsBackendAdapter,
    @inject(NotificationService) protected notificationService: NotificationService
  ) {}

  async handle(value: DeleteStudentCommand): Promise<boolean> {
    try {
      const result = await this.backendAdapter.deleteStudent(value.id);
      if (result) await fetchStudents();
      return result;
    } catch (error: any) {
      this.notificationService.notifyError(
        (error as AxiosError<Error>).response?.data?.message || error.message
      );
      return Promise.reject(error);
    }
  }
}
