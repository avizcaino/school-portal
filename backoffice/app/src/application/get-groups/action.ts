import {IGroup} from '@school-server/server';
import {Mediator} from 'mediatr-ts';
import {GroupsQuery} from './query';

export const fetchGroups = (): Promise<IGroup[]> => new Mediator().send(new GroupsQuery());
