import {inject} from 'inversify';
import {Body, Delete, Get, Path, Post, Put, Route, Tags} from 'tsoa';
import {Controller} from '../controller';
import {BackendAdapter} from '../domain/backend-adapter';
import {TEACHERS_COLLECTION} from '../domain/collections';
import {ITeacher, Teachers} from '../interfaces/teacher';
import {provideSingleton} from '../ioc';

@Route('teachers')
@Tags('teachers')
@provideSingleton(TeachersController)
export class TeachersController extends Controller implements Teachers {
  constructor(@inject(BackendAdapter) protected backendAdapter: BackendAdapter) {
    super();
  }

  @Get('all')
  getTeachers(): Promise<ITeacher[]> {
    return this.backendAdapter.getCollection<ITeacher>(TEACHERS_COLLECTION);
  }

  @Get('{id}')
  getTeacher(@Path() id: string): Promise<ITeacher> {
    return this.backendAdapter.getDocument<ITeacher>(TEACHERS_COLLECTION, id);
  }

  @Post('')
  registerTeacher(@Body() teacher: ITeacher): Promise<string> {
    return this.backendAdapter.addPerson<ITeacher>(TEACHERS_COLLECTION, teacher);
  }

  @Delete('{id}')
  deleteTeacher(@Path() id: string): Promise<boolean> {
    return this.backendAdapter.deleteDocument(TEACHERS_COLLECTION, id);
  }

  @Put('{id}')
  updateTeacher(@Path() id: string, @Body() data: ITeacher): Promise<ITeacher> {
    return this.backendAdapter.updateDocument<ITeacher>(TEACHERS_COLLECTION, id, data);
  }
}
