import {ITeacher, ITeacherExtended} from '@school-shared/core/src/interfaces/teacher';
import {inject} from 'inversify';
import {Body, Delete, Get, Path, Post, Put, Query, Route, Tags} from 'tsoa';
import {Controller} from '../controller';
import {GroupsBackendAdapter} from '../domain/groups-backend-adapter';
import {TeachersBackendAdapter} from '../domain/teachers-backend-adapter';
import {provideSingleton} from '../ioc';
import {teachersBatchInput} from '../utils/batch';

@Route('teachers')
@Tags('teachers')
@provideSingleton(TeachersController)
export class TeachersController extends Controller implements TeachersBackendAdapter {
  constructor(
    @inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter,
    @inject(GroupsBackendAdapter) protected groupsAdapter: GroupsBackendAdapter
  ) {
    super();
  }

  @Get('')
  getTeachers(@Query() extended?: boolean): Promise<ITeacher[] | ITeacherExtended[]> {
    return this.backendAdapter.getTeachers(extended);
  }

  @Get('{id}')
  getTeacher(@Path() id: string): Promise<ITeacherExtended> {
    return this.backendAdapter.getTeacher(id);
  }

  @Post('')
  registerTeacher(@Body() teacher: ITeacher): Promise<string> {
    return this.backendAdapter.registerTeacher(teacher);
  }

  @Post('batch')
  async batchRegistry(): Promise<void> {
    const groups = await this.groupsAdapter.getGroups();
    return teachersBatchInput(groups, this.backendAdapter);
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
