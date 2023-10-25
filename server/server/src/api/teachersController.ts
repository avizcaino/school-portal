import {inject} from 'inversify';
import {Body, Delete, Get, Path, Post, Put, Route, Tags} from 'tsoa';
import {Controller} from '../controller';
import {TeachersBackendAdapter} from '../domain/teachers-backend-adapter';
import {ITeacher, ITeacherExtended} from '../interfaces/teacher';
import {provideSingleton} from '../ioc';

@Route('teachers')
@Tags('teachers')
@provideSingleton(TeachersController)
export class TeachersController extends Controller implements TeachersBackendAdapter {
  constructor(@inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter) {
    super();
  }

  @Get('')
  getTeachers(): Promise<ITeacher[]> {
    return this.backendAdapter.getTeachers();
  }

  @Get('{id}')
  getTeacher(@Path() id: string): Promise<ITeacherExtended> {
    return this.backendAdapter.getTeacher(id);
  }

  @Post('')
  registerTeacher(@Body() teacher: ITeacher): Promise<string> {
    return this.backendAdapter.registerTeacher(teacher);
  }

  @Delete('{id}')
  deleteTeacher(@Path() id: string): Promise<boolean> {
    return this.backendAdapter.deleteTeacher(id);
  }

  @Put('{id}')
  updateTeacher(@Path() id: string, @Body() data: ITeacher): Promise<ITeacher> {
    return this.backendAdapter.updateTeacher(id, data);
  }
}
