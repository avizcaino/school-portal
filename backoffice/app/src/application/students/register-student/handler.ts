import {IStudentExtended, StudentsBackendAdapter} from '@school-shared/core';
import {NotificationService} from '@uxland/react-services';
import {AxiosError} from 'axios';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {fetchStudents} from '../get-students/action';
import {RegisterStudentCommand} from './command';

@injectable()
export class RegisterTeacherCommandHandler
  implements IRequestHandler<RegisterStudentCommand, IStudentExtended[]>
{
  constructor(
    @inject(StudentsBackendAdapter) protected backendAdapter: StudentsBackendAdapter,
    @inject(NotificationService) protected notificationService: NotificationService
  ) {}

  async handle(value: RegisterStudentCommand): Promise<IStudentExtended[]> {
    try {
      const id = await this.backendAdapter.registerStudent(value);
      return await fetchStudents();
    } catch (error: any) {
      this.notificationService.notifyError(
        (error as AxiosError<Error>).response?.data?.message || error.message
      );
      return Promise.reject(error);
    }
  }
}
