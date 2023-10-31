import {IStudent, StudentsBackendAdapter} from '@school-server/server';
import {inject, injectable} from 'inversify';
import {IRequestHandler, requestHandler} from 'mediatr-ts';
import {StudentsQuery} from './query';

@injectable()
@requestHandler(StudentsQuery)
export class GroupsQueryHandler implements IRequestHandler<StudentsQuery, IStudent[]> {
  constructor(@inject(StudentsBackendAdapter) protected backendAdapter: StudentsBackendAdapter) {}

  handle(value: StudentsQuery): Promise<IStudent[]> {
    return this.backendAdapter.getStudents(true);
  }
}
