import {inject} from 'inversify';
import {Body, Delete, Get, Path, Post, Route, Tags} from 'tsoa';
import {Controller} from '../controller';
import {BackendAdapter} from '../domain/backend-adapter';
import {GROUPS_COLLECTION} from '../domain/collections';
import {IGroup} from '../interfaces/group';
import {School} from '../interfaces/school';
import {provideSingleton} from '../ioc';

@Route('school')
@Tags('school')
@provideSingleton(SchoolController)
export class SchoolController extends Controller implements School {
  constructor(@inject(BackendAdapter) protected backendAdapter: BackendAdapter) {
    super();
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
