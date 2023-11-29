import {createSelector} from '@mui/x-data-grid/internals';
import {BackofficeState} from '@school-backoffice/core';

export const groupsStateSelector = (state: BackofficeState) => state?.groups;
export const groupsSelector = createSelector(groupsStateSelector, state => state?.data);
