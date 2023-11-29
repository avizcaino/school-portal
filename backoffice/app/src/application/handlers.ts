import {injectReducer} from '@school-backoffice/core';
import {requestHandler} from 'mediatr-ts';
import {CreateGroupCommand} from './groups/create-group/command';
import {CreateGroupCommandHandler} from './groups/create-group/handler';
import {GroupsQueryHandler} from './groups/get-groups/handler';
import {GroupsQuery} from './groups/get-groups/query';
import {groupsSlice} from './groups/get-groups/reducer';
import {StudentsQueryHandler} from './students/get-students/handler';
import {StudentsQuery} from './students/get-students/query';
import {studentsSlice} from './students/get-students/reducer';
import {DeleteTeacherCommand} from './teachers/delete-teacher/command';
import {DeleteTeacherCommandHandler} from './teachers/delete-teacher/handler';
import {TeachersQueryHandler} from './teachers/get-teachers/handler';
import {TeachersQuery} from './teachers/get-teachers/query';
import {teachersSlice} from './teachers/get-teachers/reducer';
import {RegisterTeacherCommand} from './teachers/register-teacher/command';
import {RegisterTeacherCommandHandler} from './teachers/register-teacher/handler';
import {UpdateTeacherCommand} from './teachers/update-teacher/command';
import {UpdateTeacherCommandHandler} from './teachers/update-teacher/handler';

export const initializeApplication = () => {
  requestHandler(CreateGroupCommand)(CreateGroupCommandHandler);
  requestHandler(GroupsQuery)(GroupsQueryHandler);
  requestHandler(StudentsQuery)(StudentsQueryHandler);
  requestHandler(TeachersQuery)(TeachersQueryHandler);
  requestHandler(RegisterTeacherCommand)(RegisterTeacherCommandHandler);
  requestHandler(UpdateTeacherCommand)(UpdateTeacherCommandHandler);
  requestHandler(DeleteTeacherCommand)(DeleteTeacherCommandHandler);
};

export const initializeStore = () => {
  injectReducer('groups', groupsSlice.reducer);
  injectReducer('teachers', teachersSlice.reducer);
  injectReducer('students', studentsSlice.reducer);
};
