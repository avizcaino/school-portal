import {ITeacherExtended} from '@school-shared/core';
import {ToolkitAsyncState} from '@uxland/redux';

export interface BackofficeState {
  teachers: ToolkitAsyncState<ITeacherExtended[]>;
}
