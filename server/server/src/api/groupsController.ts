import {GroupsBackendAdapter} from '@school-shared/core';
import {IGroup} from '@school-shared/core/src/interfaces/group';
import {inject} from 'inversify';
import {Body, Delete, Get, Path, Post, Put, Route, Tags} from 'tsoa';
import {Controller} from '../controller';
import {provideSingleton} from '../ioc';
import {groupsBatchInput} from '../utils/batch';

@Route('groups')
@Tags('groups')
@provideSingleton(GroupsController)
export class GroupsController extends Controller implements GroupsBackendAdapter {
  constructor(@inject(GroupsBackendAdapter) protected backendAdapter: GroupsBackendAdapter) {
    super();
  }

  @Get('')
  getGroups(): Promise<IGroup[]> {
    return this.backendAdapter.getGroups();
  }

  @Get('{id}')
  getGroup(@Path() id: string): Promise<IGroup> {
    return this.backendAdapter.getGroup(id);
  }

  @Post('')
  createGroup(@Body() group: IGroup): Promise<string> {
    return this.backendAdapter.createGroup(group);
  }

  @Post('batch')
  async batchRegistry(): Promise<void> {
    return groupsBatchInput(this.backendAdapter);
  }

  @Put('{id}')
  updateGroup(@Path() id: string, @Body() group: IGroup): Promise<IGroup> {
    return this.backendAdapter.updateGroup(id, group);
  }

  @Delete('{id}')
  deleteGroup(@Path() id: string): Promise<boolean> {
    return this.backendAdapter.deleteGroup(id);
  }
}
