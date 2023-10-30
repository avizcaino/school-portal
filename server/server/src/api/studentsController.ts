import {inject} from 'inversify';
import {Body, Delete, Get, Path, Post, Put, Route, Tags} from 'tsoa';
import {Controller} from '../controller';
import {GroupsBackendAdapter} from '../domain/groups-backend-adapter';
import {StudentsBackendAdapter} from '../domain/students-backend-adapter';
import {IStudent, IStudentExtended} from '../interfaces/student';
import {provideSingleton} from '../ioc';
import {studentsBatchInput} from '../utils/batch';

@Route('students')
@Tags('students')
@provideSingleton(StudentsController)
export class StudentsController extends Controller implements StudentsBackendAdapter {
  constructor(
    @inject(StudentsBackendAdapter) protected backendAdapter: StudentsBackendAdapter,
    @inject(GroupsBackendAdapter) protected groupsAdapter: GroupsBackendAdapter
  ) {
    super();
  }

  @Get('')
  getStudents(): Promise<IStudent[]> {
    return this.backendAdapter.getStudents();
  }

  @Get('{id}')
  getStudent(@Path() id: string): Promise<IStudentExtended> {
    return this.backendAdapter.getStudent(id);
  }

  @Post('')
  registerStudent(@Body() teacher: IStudent): Promise<string> {
    return this.backendAdapter.registerStudent(teacher);
  }

  @Post('batch')
  async batchRegistry(): Promise<void> {
    const groups = await this.groupsAdapter.getGroups();
    return studentsBatchInput(groups, this.backendAdapter);
  }

  @Delete('{id}')
  deleteStudent(@Path() id: string): Promise<boolean> {
    return this.backendAdapter.deleteStudent(id);
  }

  @Put('{id}')
  updateStudent(@Path() id: string, @Body() data: IStudent): Promise<IStudent> {
    return this.backendAdapter.updateStudent(id, data);
  }
}
