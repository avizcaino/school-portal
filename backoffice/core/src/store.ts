import {SP} from '@school-shared/utils';
import {iocContainer, provideSingleton} from '@uxland/ioc';
import {StoreService} from '@uxland/redux';
import {injectable} from 'inversify';
import {BACKOFFICE} from './constants';

@injectable()
@provideSingleton()
export class BackofficeStore extends StoreService {
  constructor() {
    super({}, `${SP}::${BACKOFFICE}`, true);
  }
}

const storeService = iocContainer.get(BackofficeStore);
export const injectReducer = storeService.injectReducer.bind(storeService);
const store = iocContainer.get(BackofficeStore).getStore();
export const dispatch = store.dispatch.bind(store);
export const getState = store.getState.bind(store);
export default store;
