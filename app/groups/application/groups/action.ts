import {Mediator} from 'mediatr-ts';
import {GroupsQuery} from './query';

export const fetchGroups = () => new Mediator().send(new GroupsQuery());
