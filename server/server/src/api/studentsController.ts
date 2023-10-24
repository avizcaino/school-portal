import {inject} from 'inversify';
import {Body, Delete, Get, Path, Post, Route, Tags} from 'tsoa';
import {Controller} from '../controller';
import {BackendAdapter} from '../domain/backend-adapter';
import {STUDENTS_COLLECTION} from '../domain/collections';
import {IStudent, Students} from '../interfaces/student';
import {provideSingleton} from '../ioc';

@Route('students')
@Tags('students')
@provideSingleton(StudentsController)
export class StudentsController extends Controller implements Students {
  constructor(@inject(BackendAdapter) protected backendAdapter: BackendAdapter) {
    super();
  }

  @Get('all')
  getStudents(): Promise<IStudent[]> {
    return this.backendAdapter.getCollection<IStudent>(STUDENTS_COLLECTION);
  }

  @Get('{id}')
  getStudent(@Path() id: string): Promise<IStudent> {
    return this.backendAdapter.getDocument<IStudent>(STUDENTS_COLLECTION, id);
  }

  @Post('')
  registerStudent(@Body() student: IStudent): Promise<string> {
    return this.backendAdapter.addDocument<IStudent>(STUDENTS_COLLECTION, student);
  }

  @Delete('{id}')
  deleteStudent(@Path() id: string): Promise<boolean> {
    return this.backendAdapter.deleteDocument(STUDENTS_COLLECTION, id);
  }
}
