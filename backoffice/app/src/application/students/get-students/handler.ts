import {BackofficeStore} from '@school-backoffice/core';
import {IStudent, IStudentExtended, StudentsBackendAdapter} from '@school-shared/core';
import {toolkitPerformAsyncAction} from '@uxland/redux';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {StudentsQuery} from './query';
import {studentsSlice} from './reducer';

@injectable()
export class StudentsQueryHandler
  implements IRequestHandler<StudentsQuery, IStudent[] | IStudentExtended[]>
{
  constructor(
    @inject(StudentsBackendAdapter) protected backendAdapter: StudentsBackendAdapter,
    @inject(BackofficeStore) protected store: BackofficeStore
  ) {}

  handle(value: StudentsQuery): Promise<IStudent[] | IStudentExtended[]> {
    return toolkitPerformAsyncAction<IStudent[] | IStudentExtended[]>(
      this.store.dispatch.bind(this.store),
      studentsSlice.actions,
      () => this.backendAdapter.getStudents(true)
    );
  }
}
