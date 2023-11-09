export * from './application';
export * from './constants';
export * from './infrastructure';
export * from './utils';
import {iocContainer, setMediatorResolver} from '@uxland/ioc';

export const initializeCore = () => {
  return setMediatorResolver(iocContainer).then(async () => {
    await import('./infrastructure');
    // await import('./application/handlers');
    return Promise.resolve();
  });
};
