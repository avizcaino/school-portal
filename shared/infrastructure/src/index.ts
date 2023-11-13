import {iocContainer, setMediatorResolver} from '@uxland/ioc';

export * from './backend-adapter-base';
export * from './groups-backend-adapter';
export * from './notification-service';
export * from './students-backend-adapter';
export * from './teachers-backend-adapter';

export const initializeCore = () => {
  return setMediatorResolver(iocContainer).then(async () => {
    await import('../../infrastructure/src');
    // await import('./application/handlers');
    return Promise.resolve();
  });
};
