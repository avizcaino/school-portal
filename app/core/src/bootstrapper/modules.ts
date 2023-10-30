import {IModule} from '../domain/module';
import {UserRole} from '../domain/roles';

export const moduleNames = {
  groups: 'groups',
};

export const modules: IModule[] = [
  {
    id: moduleNames.groups,
    folder: moduleNames.groups,
    initialized: false,
    roles: [UserRole.admin],
  },
];
