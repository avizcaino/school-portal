import {ITeacher, ITeacherExtended, TeachersBackendAdapter} from '@school-shared/core';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {TeachersQuery} from './query';

@injectable()
export class TeachersQueryHandler
  implements IRequestHandler<TeachersQuery, ITeacher[] | ITeacherExtended[]>
{
  constructor(@inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter) {}

  handle(value: TeachersQuery): Promise<ITeacher[] | ITeacherExtended[]> {
    return this.backendAdapter.getTeachers(true);
  }
}
