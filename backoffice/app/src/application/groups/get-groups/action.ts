import {IGroup} from '@school-shared/core';
import {Mediator} from 'mediatr-ts';
import {GroupsQuery} from './query';

export const fetchGroups = (): Promise<IGroup[]> => new Mediator().send(new GroupsQuery());
