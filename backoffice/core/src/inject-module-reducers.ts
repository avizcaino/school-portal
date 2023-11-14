import {combineReducers, Reducer} from '@reduxjs/toolkit';
import {injectReducer} from './store';

export const injectModuleReducers = (moduleName: string, reducers: {[key: string]: Reducer}) => {
  const rs = combineReducers(reducers);
  injectReducer(moduleName, rs);
};
