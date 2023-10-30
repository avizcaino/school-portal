import {IGroup} from '@school-server/server';
import {Mediator} from 'mediatr-ts';
import {CreateGroupCommand} from './command';

export const createGroup = (group: IGroup): Promise<string> =>
  new Mediator().send(new CreateGroupCommand());
