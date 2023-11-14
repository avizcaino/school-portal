import {injectReducer} from '@school-backoffice/core';
import {requestHandler} from 'mediatr-ts';
import {CreateGroupCommand} from './create-group/command';
import {CreateGroupCommandHandler} from './create-group/handler';
import {DeleteTeacherCommand} from './delete-teacher/command';
import {DeleteTeacherCommandHandler} from './delete-teacher/handler';
import {GroupsQueryHandler} from './get-groups/handler';
import {GroupsQuery} from './get-groups/query';
import {StudentsQueryHandler} from './get-students/handler';
import {StudentsQuery} from './get-students/query';
import {TeachersQueryHandler} from './get-teachers/handler';
import {TeachersQuery} from './get-teachers/query';
import {teachersSlice} from './get-teachers/reducer';
import {RegisterTeacherCommand} from './register-teacher/command';
import {RegisterTeacherCommandHandler} from './register-teacher/handler';
import {UpdateTeacherCommand} from './update-teacher/command';
import {UpdateTeacherCommandHandler} from './update-teacher/handler';

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
  injectReducer('teachers', teachersSlice.reducer);
};
