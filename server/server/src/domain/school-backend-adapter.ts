import {IGroup} from '../interfaces/group';

export abstract class SchoolBackendAdapter {
  abstract getGroups(): Promise<IGroup[]>;
  abstract getGroup(id: string): Promise<IGroup>;
}
