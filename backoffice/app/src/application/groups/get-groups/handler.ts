import {BackofficeStore} from '@school-backoffice/core';
import {GroupsBackendAdapter, IGroup} from '@school-shared/core';
import {toolkitPerformAsyncAction} from '@uxland/redux';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {GroupsQuery} from './query';
import {groupsSlice} from './reducer';

@injectable()
export class GroupsQueryHandler implements IRequestHandler<GroupsQuery, IGroup[]> {
  constructor(
    @inject(GroupsBackendAdapter) protected backendAdapter: GroupsBackendAdapter,
    @inject(BackofficeStore) protected store: BackofficeStore
  ) {}

  handle(value: GroupsQuery): Promise<IGroup[]> {
    return toolkitPerformAsyncAction<IGroup[]>(
      this.store.dispatch.bind(this.store),
      groupsSlice.actions,
      () => this.backendAdapter.getGroups()
    );
  }
}
