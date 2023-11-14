import {Action, combineReducers, configureStore, EnhancedStore, Reducer} from '@reduxjs/toolkit';
import {iocContainer, provideSingleton} from '@uxland/ioc';
import {injectable} from 'inversify';
// import {config} from '../application/config/reducer';
// import {geoLocation} from '../application/geo-location/reducer';
// import {masterData} from '../application/master-data/reducer';
// import {appModules} from '../application/modules/reducer';
// import {navigationOrigin} from '../application/navigation-origin/reducer';
// import {pushSlice} from '../application/push/reducer';
import {SP} from '@school-shared/utils';
import {BACKOFFICE} from './constants';

@injectable()
@provideSingleton()
export class BackofficeStore {
  private store: EnhancedStore<any, any, any>;
  private reducers: {[key: string]: Reducer} = {
    // appModules: appModules.reducer,
    // config: config.reducer,
    // masterData: masterData.reducer,
    // geoLocation: geoLocation.reducer,
    // navigationOrigin: navigationOrigin.reducer,
    // push: pushSlice.reducer,
  };

  constructor() {
    this.store = configureStore({
      reducer: this.reducers,
      devTools: import.meta.env.NODE_ENV === 'production' ? false : {name: `${SP}::${BACKOFFICE}`},
    });
  }

  getStore() {
    return this.store;
  }

  getState() {
    return this.store?.getState();
  }

  injectReducer(key: string, reducer: Reducer) {
    this.reducers[key] = reducer;
    const rootReducer = combineReducers(this.reducers);
    this.store?.replaceReducer(rootReducer as any);
  }

  dispatch(action: Action) {
    this.store?.dispatch(action);
  }
}

const backofficeStore = iocContainer.get(BackofficeStore);

export const injectReducer = backofficeStore.injectReducer.bind(backofficeStore);
const store = iocContainer.get(BackofficeStore).getStore();
export const dispatch = store.dispatch.bind(store);
export const getState = store.getState.bind(store);
export default store;
