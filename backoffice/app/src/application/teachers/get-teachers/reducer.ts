import {coreActionBuilder} from '@school-backoffice/core';
import {createAsyncSlice} from '@uxland/redux';

export const teachersSlice = createAsyncSlice(coreActionBuilder('teachers'), []);
export const {setStatus, setData, setError} = teachersSlice.actions;
