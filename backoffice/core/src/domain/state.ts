import {IGroup, IStudentExtended, ITeacherExtended} from '@school-shared/core';
import {ToolkitAsyncState} from '@uxland/redux';

export interface BackofficeState {
  groups: ToolkitAsyncState<IGroup[]>;
  teachers: ToolkitAsyncState<ITeacherExtended[]>;
  students: ToolkitAsyncState<IStudentExtended[]>;
}
