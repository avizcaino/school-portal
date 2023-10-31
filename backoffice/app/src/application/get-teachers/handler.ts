import {ITeacher, ITeacherExtended, TeachersBackendAdapter} from '@school-server/server';
import {inject, injectable} from 'inversify';
import {IRequestHandler, requestHandler} from 'mediatr-ts';
import {TeachersQuery} from './query';

@injectable()
@requestHandler(TeachersQuery)
export class TeachersQueryHandler
  implements IRequestHandler<TeachersQuery, ITeacher[] | ITeacherExtended[]>
{
  constructor(@inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter) {}

  handle(value: TeachersQuery): Promise<ITeacher[] | ITeacherExtended[]> {
    return this.backendAdapter.getTeachers(true);
  }
}
