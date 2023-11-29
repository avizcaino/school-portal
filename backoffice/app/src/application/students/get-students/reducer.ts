import {coreActionBuilder} from '@school-backoffice/core';
import {createAsyncSlice} from '@uxland/redux';

export const studentsSlice = createAsyncSlice(coreActionBuilder('students'), []);
export const {setStatus, setData, setError} = studentsSlice.actions;
