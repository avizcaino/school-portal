import {inject} from 'inversify';
import {Body, Delete, Get, Path, Post, Route} from 'tsoa';
import {Controller} from '../controller';
import {BackendAdapter} from '../domain/backend-adapter';
import {GROUPS_COLLECTION, STUDENTS_COLLECTION, TEACHERS_COLLECTION} from '../domain/collections';
import {IGroup} from '../interfaces/group';
import {School} from '../interfaces/school';
import {IStudent} from '../interfaces/student';
import {ITeacher} from '../interfaces/teacher';
import {provideSingleton} from '../ioc';

@Route('school')
@provideSingleton(SchoolController)
export class SchoolController extends Controller implements School {
  constructor(@inject(BackendAdapter) protected backendAdapter: BackendAdapter) {
    super();
  }

  @Get('student/all')
  getStudents(): Promise<IStudent[]> {
    return this.backendAdapter.getCollection<IStudent>(STUDENTS_COLLECTION);
  }

  @Get('student/{id}')
  getStudent(@Path() id: string): Promise<IStudent> {
    return this.backendAdapter.getDocument<IStudent>(STUDENTS_COLLECTION, id);
  }

  @Post('student')
  registerStudent(@Body() student: IStudent): Promise<string> {
    return this.backendAdapter.addDocument<IStudent>(STUDENTS_COLLECTION, student);
  }

  @Delete('student/{id}')
  deleteStudent(@Path() id: string): Promise<boolean> {
    return this.backendAdapter.deleteDocument(STUDENTS_COLLECTION, id);
  }

  @Get('teacher/all')
  getTeachers(): Promise<ITeacher[]> {
    return this.backendAdapter.getCollection<ITeacher>(TEACHERS_COLLECTION);
  }

  @Get('teacher/{id}')
  getTeacher(@Path() id: string): Promise<ITeacher> {
    return this.backendAdapter.getDocument<ITeacher>(TEACHERS_COLLECTION, id);
  }

  @Post(`teacher`)
  registerTeacher(@Body() teacher: ITeacher): Promise<string> {
    return this.backendAdapter.addDocument<ITeacher>(TEACHERS_COLLECTION, teacher);
  }

  @Delete('teacher/{id}')
  deleteTeacher(@Path() id: string): Promise<boolean> {
    return this.backendAdapter.deleteDocument(TEACHERS_COLLECTION, id);
  }

  @Get('group/all')
  getGroups(): Promise<IGroup[]> {
    return this.backendAdapter.getCollection<IGroup>(GROUPS_COLLECTION);
  }

  @Get('group/{id}')
  getGroup(@Path() id: string): Promise<IGroup> {
    return this.backendAdapter.getDocument<IGroup>(GROUPS_COLLECTION, id);
  }

  @Post('group')
  addGroup(@Body() group: IGroup): Promise<string> {
    return this.backendAdapter.addDocument<IGroup>(GROUPS_COLLECTION, group);
  }

  @Delete('group/{id}')
  deleteGroup(@Path() id: string): Promise<boolean> {
    return this.backendAdapter.deleteDocument(GROUPS_COLLECTION, id);
  }
}
