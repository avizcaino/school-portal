import {BackofficeStore} from '@school-backoffice/core';
import {ITeacherExtended, TeachersBackendAdapter} from '@school-shared/core';
import {NotificationService} from '@uxland/react-services';
import {AxiosError} from 'axios';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {setData} from '../get-teachers/reducer';
import {teachersSelector} from '../get-teachers/selectors';
import {UpdateTeacherCommand} from './command';

@injectable()
export class UpdateTeacherCommandHandler
  implements IRequestHandler<UpdateTeacherCommand, ITeacherExtended>
{
  constructor(
    @inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter,
    @inject(NotificationService) protected notificationService: NotificationService,
    @inject(BackofficeStore) protected store: BackofficeStore
  ) {}

  async handle(value: UpdateTeacherCommand): Promise<ITeacherExtended> {
    try {
      await this.backendAdapter.updateTeacher(value.id, value.data);
      const teachers = teachersSelector(this.store.getState());
      const newTeacher = await this.backendAdapter.getTeacher(value.id);
      this.store.dispatch(setData(teachers.map(t => (t.id === newTeacher.id ? newTeacher : t))));
      return newTeacher;
    } catch (error: any) {
      this.notificationService.notifyError(
        (error as AxiosError<Error>).response?.data?.message || error.message
      );
      return Promise.reject(error);
    }
  }
}
