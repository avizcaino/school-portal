import {ITeacher, ITeacherExtended, TeachersBackendAdapter} from '@school-server/server';
import {provideSingleton} from '@uxland/ioc';
import {inject, injectable} from 'inversify';
import {BackendAdapterBase} from './backend-adapter-base';

@injectable()
@provideSingleton(TeachersBackendAdapter)
export class TeachersBackendAdapterImpl implements TeachersBackendAdapter {
  constructor(@inject(BackendAdapterBase) protected adapter: BackendAdapterBase) {}
  getTeachers(extended?: boolean): Promise<ITeacher[] | ITeacherExtended[]> {
    return this.adapter.fetch(`/teachers?extended=${extended}`, 'get');
  }
  getTeacher(id: string): Promise<ITeacherExtended> {
    throw new Error('Method not implemented.');
  }
  registerTeacher(teacher: ITeacher): Promise<string> {
    throw new Error('Method not implemented.');
  }
  updateTeacher(id: string, teacher: ITeacher): Promise<ITeacher> {
    return this.adapter.fetch(`/teachers/${id}`, 'put', teacher);
  }
  deleteTeacher(id: string): Promise<boolean> {
    return this.adapter.fetch(`/teachers/${id}`, 'delete');
  }
}
