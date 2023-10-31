import {IStudent, IStudentExtended, StudentsBackendAdapter} from '@school-server/server';
import {inject, injectable} from 'inversify';
import {IRequestHandler, requestHandler} from 'mediatr-ts';
import {StudentsQuery} from './query';

@injectable()
@requestHandler(StudentsQuery)
export class StudentsQueryHandler
  implements IRequestHandler<StudentsQuery, IStudent[] | IStudentExtended[]>
{
  constructor(@inject(StudentsBackendAdapter) protected backendAdapter: StudentsBackendAdapter) {}

  handle(value: StudentsQuery): Promise<IStudent[] | IStudentExtended[]> {
    return this.backendAdapter.getStudents(true);
  }
}
