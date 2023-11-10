import {
  GroupsBackendAdapter,
  StudentsBackendAdapter,
  TeachersBackendAdapter,
} from '@school-shared/core';
import {FirebaseDB} from '../domain/db';
import {provideTransient} from '../ioc';
import {FirebaseDBImpl} from './db';
import {GroupsBackendAdapterImpl} from './groups-backend-adapter';
import {StudentsBackendAdapterImpl} from './students-backend-adapter';
import {TeachersBackendAdapterImpl} from './teachers-backend-adapter';

export const initializeInfrastructure = () => {
  provideTransient(FirebaseDB)(FirebaseDBImpl);
  provideTransient(GroupsBackendAdapter)(GroupsBackendAdapterImpl);
  provideTransient(TeachersBackendAdapter)(TeachersBackendAdapterImpl);
  provideTransient(StudentsBackendAdapter)(StudentsBackendAdapterImpl);
};
