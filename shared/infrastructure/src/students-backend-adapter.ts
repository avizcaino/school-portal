import {StudentsBackendAdapter} from '@school-shared/core/src/domain/students-backend-adapter';
import {IStudent, IStudentExtended} from '@school-shared/core/src/interfaces/student';
import {provideSingleton} from '@uxland/ioc';
import {inject, injectable} from 'inversify';
import {BackendAdapterBase} from './backend-adapter-base';

@injectable()
@provideSingleton(StudentsBackendAdapter)
export class StudentsBackendAdapterImpl implements StudentsBackendAdapter {
  constructor(@inject(BackendAdapterBase) protected adapter: BackendAdapterBase) {}
  getStudents(extended?: boolean): Promise<IStudent[] | IStudentExtended[]> {
    return this.adapter.fetch(`/students?extended=${extended}`, 'get');
  }
  getStudent(id: string): Promise<IStudentExtended> {
    throw new Error('Method not implemented.');
  }
  registerStudent(group: IStudent): Promise<string> {
    throw new Error('Method not implemented.');
  }
  updateStudent(id: string, group: IStudent): Promise<IStudent> {
    throw new Error('Method not implemented.');
  }
  deleteStudent(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
