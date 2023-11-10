import {IGroup} from '../interfaces/group';

export abstract class GroupsBackendAdapter {
  abstract getGroups(): Promise<IGroup[]>;
  abstract getGroup(id: string): Promise<IGroup>;
  abstract createGroup(group: IGroup): Promise<string>;
  abstract updateGroup(id: string, group: IGroup): Promise<IGroup>;
  abstract deleteGroup(id: string): Promise<boolean>;
}
