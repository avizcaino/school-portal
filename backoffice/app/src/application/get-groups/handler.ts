import {GroupsBackendAdapter, IGroup} from '@school-server/server';
import {inject, injectable} from 'inversify';
import {IRequestHandler, requestHandler} from 'mediatr-ts';
import {GroupsQuery} from './query';

@injectable()
@requestHandler(GroupsQuery)
export class GroupsQueryHandler implements IRequestHandler<GroupsQuery, IGroup[]> {
  constructor(@inject(GroupsBackendAdapter) protected backendAdapter: GroupsBackendAdapter) {}

  handle(value: GroupsQuery): Promise<IGroup[]> {
    return this.backendAdapter.getGroups();
  }
}
