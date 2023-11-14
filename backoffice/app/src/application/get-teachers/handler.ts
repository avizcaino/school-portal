import {BackofficeStore} from '@school-backoffice/core';
import {ITeacher, ITeacherExtended, TeachersBackendAdapter} from '@school-shared/core';
import {toolkitPerformAsyncAction} from '@uxland/redux';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {TeachersQuery} from './query';
import {teachersSlice} from './reducer';

@injectable()
export class TeachersQueryHandler
  implements IRequestHandler<TeachersQuery, ITeacher[] | ITeacherExtended[]>
{
  constructor(
    @inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter,
    @inject(BackofficeStore) protected store: BackofficeStore
  ) {}

  async handle(value: TeachersQuery): Promise<ITeacher[] | ITeacherExtended[]> {
    return toolkitPerformAsyncAction<ITeacher[] | ITeacherExtended[]>(
      this.store.dispatch.bind(this.store),
      teachersSlice.actions,
      () => this.backendAdapter.getTeachers(true)
    );
  }
}
