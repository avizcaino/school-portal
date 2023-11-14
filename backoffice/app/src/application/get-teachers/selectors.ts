import {createSelector} from '@mui/x-data-grid/internals';
import {BackofficeState} from '@school-backoffice/core';

export const teachersStateSelector = (state: BackofficeState) => state?.teachers;
export const teachersSelector = createSelector(teachersStateSelector, state => state?.data);
