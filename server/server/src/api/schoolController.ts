import {inject} from 'inversify';
import {Body, Delete, Get, Path, Post, Put, Route, Tags} from 'tsoa';
import {Controller} from '../controller';
import {SchoolBackendAdapter} from '../domain/school-backend-adapter';
import {IGroup} from '../interfaces/group';
import {provideSingleton} from '../ioc';

@Route('school')
@Tags('school')
@provideSingleton(SchoolController)
export class SchoolController extends Controller implements SchoolBackendAdapter {
  constructor(@inject(SchoolBackendAdapter) protected backendAdapter: SchoolBackendAdapter) {
    super();
  }

  @Get('group/all')
  getGroups(): Promise<IGroup[]> {
    return this.backendAdapter.getGroups();
  }

  @Get('group/{id}')
  getGroup(@Path() id: string): Promise<IGroup> {
    return this.backendAdapter.getGroup(id);
  }

  @Post('group')
  createGroup(@Body() group: IGroup): Promise<string> {
    return this.backendAdapter.createGroup(group);
  }

  @Put('group/{id}')
  updateGroup(@Path() id: string, @Body() group: IGroup): Promise<IGroup> {
    return this.backendAdapter.updateGroup(id, group);
  }

  @Delete('group/{id}')
  deleteGroup(@Path() id: string): Promise<boolean> {
    return this.backendAdapter.deleteGroup(id);
  }
}
