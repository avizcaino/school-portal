import {inject} from 'inversify';
import {Body, Delete, Get, Path, Post, Route} from 'tsoa';
import {Controller} from '../controller';
import {BackendAdapter} from '../domain/backend-adapter';
import {TEACHERS_COLLECTION} from '../domain/collections';
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
    throw new Error('Not implemented');
  }

  @Get('student/{id}')
  getStudent(@Path() id: string): Promise<IStudent> {
    console.log(id);
    throw new Error('Not implemented');
  }

  @Post('student')
  registerStudent(@Body() student: IStudent): Promise<string> {
    console.log(student);
    throw new Error('Method not implemented.');
  }

  @Delete('student/{id}')
  deleteStudent(@Path() id: string): Promise<boolean> {
    console.log(id);
    throw new Error('Method not implemented.');
  }

  @Get('teacher/all')
  getTeachers(): Promise<ITeacher[]> {
    return this.backendAdapter.getAll<ITeacher>(TEACHERS_COLLECTION);
  }

  @Get('teacher/{id}')
  getTeacher(@Path() id: string): Promise<ITeacher> {
    console.log(id);
    throw new Error('Not implemented');
  }

  @Post(`teacher`)
  registerTeacher(@Body() teacher: ITeacher): Promise<string> {
    console.log(teacher);
    throw new Error('Method not implemented.');
  }

  @Delete('teacher/{id}')
  deleteTeacher(@Path() id: string): Promise<boolean> {
    console.log(id);
    throw new Error('Method not implemented.');
  }

  @Get('group/all')
  getGroups(): Promise<IGroup[]> {
    throw new Error('Not implemented');
  }

  @Get('group/{id}')
  getGroup(@Path() id: string): Promise<IGroup> {
    console.log(id);
    throw new Error('Method not implemented.');
  }

  @Post('group')
  addGroup(@Body() group: IGroup): Promise<string> {
    console.log(group);
    throw new Error('Method not implemented.');
  }

  @Delete('group/{id}')
  deleteGroup(@Path() id: string): Promise<boolean> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
}
