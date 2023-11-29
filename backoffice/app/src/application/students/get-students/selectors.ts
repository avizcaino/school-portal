import {createSelector} from '@mui/x-data-grid/internals';
import {BackofficeState} from '@school-backoffice/core';

export const studentsStateSelector = (state: BackofficeState) => state?.students;
export const studentsSelector = createSelector(studentsStateSelector, state => state?.data);
