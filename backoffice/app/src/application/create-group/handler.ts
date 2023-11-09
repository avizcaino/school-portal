import {GroupsBackendAdapter, IGroup} from '@school-server/server';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {CreateGroupCommand} from './command';

@injectable()
export class CreateGroupCommandHandler implements IRequestHandler<CreateGroupCommand, string> {
  constructor(@inject(GroupsBackendAdapter) protected backendAdapter: GroupsBackendAdapter) {}

  handle(value: CreateGroupCommand): Promise<string> {
    return this.backendAdapter.createGroup(value as IGroup);
  }
}
