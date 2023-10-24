import {ID} from './entity';
import {IGroup} from './group';

export abstract class School {
  abstract addGroup(group: IGroup): Promise<ID>;
  abstract deleteGroup(id: string): Promise<boolean>;
  abstract getGroups(): Promise<IGroup[]>;
  abstract getGroup(id: string): Promise<IGroup>;
}
