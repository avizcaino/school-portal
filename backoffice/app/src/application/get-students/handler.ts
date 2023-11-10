import {IStudent, IStudentExtended, StudentsBackendAdapter} from '@school-shared/core';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {StudentsQuery} from './query';

@injectable()
export class StudentsQueryHandler
  implements IRequestHandler<StudentsQuery, IStudent[] | IStudentExtended[]>
{
  constructor(@inject(StudentsBackendAdapter) protected backendAdapter: StudentsBackendAdapter) {}

  handle(value: StudentsQuery): Promise<IStudent[] | IStudentExtended[]> {
    return this.backendAdapter.getStudents(true);
  }
}
