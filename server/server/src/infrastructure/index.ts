import {FirebaseDB} from '../domain/db';
import {GroupsBackendAdapter} from '../domain/groups-backend-adapter';
import {StudentsBackendAdapter} from '../domain/students-backend-adapter';
import {TeachersBackendAdapter} from '../domain/teachers-backend-adapter';
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
