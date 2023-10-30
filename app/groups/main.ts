import {IModule} from '@school-portal/core';

export const initialize = async (module: IModule) => {
  console.log(`Initializing ${module.id}`);
  await import('./infrastructure');
  await import('./application/handlers');
};
