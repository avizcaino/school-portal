import {GroupsBackendAdapter} from '@school-shared/core/src/domain/groups-backend-adapter';
import {IGroup} from '@school-shared/core/src/interfaces/group';
import {provideSingleton} from '@uxland/ioc';
import {inject, injectable} from 'inversify';
import {BackendAdapterBase} from './backend-adapter-base';

@injectable()
@provideSingleton(GroupsBackendAdapter)
export class GroupsBackendAdapterImpl implements GroupsBackendAdapter {
  constructor(@inject(BackendAdapterBase) protected adapter: BackendAdapterBase) {}
  getGroups(): Promise<IGroup[]> {
    return this.adapter.fetch('/groups', 'get');
  }
  getGroup(id: string): Promise<IGroup> {
    return this.adapter.fetch(`/groups/${id}`, 'get');
  }
  createGroup(group: IGroup): Promise<string> {
    return this.adapter.fetch('/groups', 'post', group);
  }
  updateGroup(id: string, group: IGroup): Promise<IGroup> {
    throw new Error('Method not implemented.');
  }
  deleteGroup(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
