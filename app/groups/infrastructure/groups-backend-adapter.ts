import {BackendAdapterBase} from '@school-portal/core/src/infrastructure/backend-adapter-base';
import {GroupsBackendAdapter, IGroup} from '@school-server/server';
import {provideSingleton} from '@uxland/ioc';
import {inject, injectable} from 'inversify';

console.log('groups backend adapter');
@injectable()
@provideSingleton(GroupsBackendAdapter)
export class BackendAdapterImpl implements GroupsBackendAdapter {
  constructor(@inject(BackendAdapterBase) protected adapter: BackendAdapterBase) {}
  getGroups(): Promise<IGroup[]> {
    return this.adapter.fetch('/groups', 'get');
  }
  getGroup(id: string): Promise<IGroup> {
    throw new Error('Method not implemented.');
  }
  createGroup(group: IGroup): Promise<string> {
    throw new Error('Method not implemented.');
  }
  updateGroup(id: string, group: IGroup): Promise<IGroup> {
    throw new Error('Method not implemented.');
  }
  deleteGroup(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
