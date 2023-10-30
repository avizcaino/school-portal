import {iocContainer, setMediatorResolver} from '@uxland/ioc';
export * from './domain';

export const initializeCore = () => {
  return setMediatorResolver(iocContainer).then(async () => {
    await import('./infrastructure');
    // await import('./application/handlers');
    await import('./bootstrapper');
    return Promise.resolve();
  });
};
