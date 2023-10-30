import {IModule} from '../domain/module';
import {UserRole} from '../domain/roles';
import {moduleNames} from './modules';
export * from './modules';
export const bootstrapModules = async (modules: IModule[], role: UserRole) => {
  try {
    for (const module of modules) {
      let main;
      if (module.id == moduleNames.groups) main = await import('../../../groups/main');
      await main?.initialize(module);
    }
  } catch (error) {
    console.log(error);
  }
};
