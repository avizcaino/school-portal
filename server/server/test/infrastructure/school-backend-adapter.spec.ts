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
    {id: 'g3a', internalId: 'g3a', grade: 3, subGroup: 'A', name: 'I3A'},
    {id: 'g3b', internalId: 'g3b', grade: 3, subGroup: 'B', name: 'I3B'},
  ],
  [TEACHERS_COLLECTION]: [
    {name: 'John', firstSurname: 'Doe', internalId: '48001122X', groups: ['g3a']},
    {name: 'Jane', firstSurname: 'Doe', internalId: '49003344Y', groups: ['g3b']},
  ],
  [STUDENTS_COLLECTION]: [
    {
      name: 'Peter',
      firstSurname: 'Smith',
      internalId: '00112233A',
      birthDate: new Date(),
      group: 'g3a',
    },
    {
      name: 'Pat',
      firstSurname: 'Smith',
      internalId: '44556677B',
      birthDate: new Date(),
      group: 'g3a',
    },
    {
      name: 'David',
      firstSurname: 'James',
      internalId: '88990000C',
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
        (g: any) => g.groups?.indexOf(GROUP_ID) > -1
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
  describe('When creating a school group', () => {
    it('should return its id', async () => {
      const id = await backend.createGroup({
        internalId: 'g4b',
        grade: 4,
        subGroup: 'A',
        name: 'I4A',
      });
      expect(id).toBeDefined();
    });
    it('should not add group if it already exists', async () => {
      try {
        await backend.createGroup({
          internalId: 'g4b',
          grade: 4,
          subGroup: 'A',
          name: 'I4A',
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('When updating a school group', () => {
    it('should return new updated group', async () => {
      const group = await backend.updateGroup('g3a', {
        internalId: 'g3a',
        grade: 3,
        subGroup: 'A',
        name: 'NEW-G3A',
      });

      expect(group.internalId).toEqual('g3a');
      expect(group.name).toEqual('NEW-G3A');
    });
    it('should throw error if group does not exist', async () => {
      try {
        await backend.updateGroup('g3c', {internalId: 'g3c', grade: 3, subGroup: 'C', name: 'I3C'});
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('When deleting a school group', () => {
    it('should return true if group exists', async () => {
      const groups = await backend.getGroups();
      const result = await backend.deleteGroup('g3a');
      const newGroups = await backend.getGroups();
      expect(result).toBeTruthy();
      expect(groups.length).greaterThan(newGroups.length);
    });
    it('should throw error if group does not exist', async () => {
      try {
        await backend.deleteGroup('g3c');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
