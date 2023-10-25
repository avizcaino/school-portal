import 'reflect-metadata';
import {beforeAll, describe, expect, it} from 'vitest';
import {
  GROUPS_COLLECTION,
  STUDENTS_COLLECTION,
  TEACHERS_COLLECTION,
} from '../../src/domain/collections';
import {FirebaseDB} from '../../src/domain/db';
import {SchoolBackendAdapter} from '../../src/domain/school-backend-adapter';
import {SchoolBackendAdapterImpl} from '../../src/infrastructure/school-backend-adapter';
import {DummyDB, DummyDBData} from '../assets/dummy-db';

const defaultData: DummyDBData = {
  [GROUPS_COLLECTION]: [
    {id: 'g3a', grade: 3, subGroup: 'A', name: 'I3A'},
    {id: 'g3b', grade: 3, subGroup: 'B', name: 'I3B'},
  ],
  [TEACHERS_COLLECTION]: [
    {name: 'John', firstSurname: 'Doe', documentId: '48001122X', groups: ['g3a']},
    {name: 'Jane', firstSurname: 'Doe', documentId: '49003344Y', groups: ['g3b']},
  ],
  [STUDENTS_COLLECTION]: [
    {
      name: 'Peter',
      firstSurname: 'Smith',
      documentId: '00112233A',
      birthDate: new Date(),
      group: 'g3a',
    },
    {
      name: 'Pat',
      firstSurname: 'Smith',
      documentId: '44556677B',
      birthDate: new Date(),
      group: 'g3a',
    },
    {
      name: 'David',
      firstSurname: 'James',
      documentId: '88990000C',
      birthDate: new Date(),
      group: 'g3b',
    },
  ],
};

describe('Given the school backend adapter', () => {
  let backend: SchoolBackendAdapter, db: FirebaseDB;

  beforeAll(() => {
    db = new DummyDB(defaultData);
    backend = new SchoolBackendAdapterImpl(db);
  });
  describe('When fetching school groups', () => {
    it('should return an array of school groups', async () => {
      const groups = await backend.getGroups();
      expect(groups.length).toEqual(defaultData.groups.length);
    });
  });
  describe('When fetching a school group', () => {
    it('should return a school group with its teachers and students', async () => {
      const GROUP_ID = 'g3a';
      const defaultGroupTeachers = defaultData.teachers.filter(
        g => g.groups?.indexOf(GROUP_ID) > -1
      );
      const defaultGroupStudents = defaultData.students.filter(g => g.group === GROUP_ID);
      const group = await backend.getGroup(GROUP_ID);
      expect(group).toBeDefined();
      expect(group.teachers).toEqual(defaultGroupTeachers);
      expect(group.students).toEqual(defaultGroupStudents);
    });
    it('should throw error if group does not exists', async () => {
      const GROUP_ID = 'dummy';
      try {
        await backend.getGroup(GROUP_ID);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
