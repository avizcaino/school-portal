import {coreActionBuilder} from '@school-backoffice/core';
import {createAsyncSlice} from '@uxland/redux';

export const groupsSlice = createAsyncSlice(coreActionBuilder('groups'), []);
export const {setStatus, setData, setError} = groupsSlice.actions;
