import {UserRole} from './roles';

export interface IModule {
  id: string;
  folder: string;
  initialized: boolean;
  roles?: UserRole[];
}
