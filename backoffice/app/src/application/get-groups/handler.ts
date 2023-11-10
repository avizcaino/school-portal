import {GroupsBackendAdapter, IGroup} from '@school-shared/core';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {GroupsQuery} from './query';

@injectable()
export class GroupsQueryHandler implements IRequestHandler<GroupsQuery, IGroup[]> {
  constructor(@inject(GroupsBackendAdapter) protected backendAdapter: GroupsBackendAdapter) {}

  handle(value: GroupsQuery): Promise<IGroup[]> {
    return this.backendAdapter.getGroups();
  }
}
