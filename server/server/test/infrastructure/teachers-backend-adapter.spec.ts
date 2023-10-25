import 'reflect-metadata';
import {beforeAll, describe, expect, it} from 'vitest';
import {FirebaseDB} from '../../src/domain/db';
import {TeachersBackendAdapter} from '../../src/domain/teachers-backend-adapter';
import {TeachersBackendAdapterImpl} from '../../src/infrastructure/teachers-backend-adapter';
import {dummyData} from '../assets/dummy-data';
import {DummyDB} from '../assets/dummy-db';

describe('Given the teachers backend adapter', () => {
  let backend: TeachersBackendAdapter, db: FirebaseDB;

  beforeAll(() => {
    db = new DummyDB(dummyData);
    backend = new TeachersBackendAdapterImpl(db);
  });
  describe('When fetching teachers', () => {
    it('should return an array of teachers', async () => {
      const teachers = await backend.getTeachers();
      expect(teachers.length).toEqual(dummyData.teachers.length);
    });
  });
  describe('When fetching a teacher', () => {
    it('should return a teacher with its groups', async () => {
      const TEACHER_ID = '48001122X';
      const defaultTeacher = dummyData.teachers.find(t => t.id === TEACHER_ID);
      const defaultGroupTeachers = dummyData.groups.filter(g =>
        defaultTeacher?.groups?.includes(g.id as string)
      );
      const teacher = await backend.getTeacher(TEACHER_ID);
      expect(teacher).toBeDefined();
      expect(teacher.groups).toEqual(defaultGroupTeachers);
    });
    it('should throw error if teacher does not exists', async () => {
      const TEACHER_ID = 'dummy';
      try {
        await backend.getTeacher(TEACHER_ID);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('When creating a teacher', () => {
    it('should return its id', async () => {
      const id = await backend.registerTeacher({
        internalId: 'new-id',
        name: 'Peter',
        firstSurname: 'Smith',
      });
      expect(id).toBeDefined();
    });
    it('should not add teacher if it already exists', async () => {
      try {
        await backend.registerTeacher({
          internalId: 'new-id',
          name: 'Peter',
          firstSurname: 'Smith',
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('When updating a teacher', () => {
    it('should return new updated teacher', async () => {
      const teacher = await backend.updateTeacher('48001122X', {
        internalId: '48001122X',
        name: 'Peter',
        firstSurname: 'Parker',
      });

      expect(teacher.internalId).toEqual('48001122X');
      expect(teacher.firstSurname).toEqual('Parker');
    });
    it('should throw error if teacher does not exist', async () => {
      try {
        await backend.updateTeacher('48001122A', {
          internalId: '48001122X',
          name: 'Peter',
          firstSurname: 'Parker',
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('When deleting a teacher', () => {
    it('should return true if teacher exists', async () => {
      const teachers = await backend.getTeachers();
      const result = await backend.deleteTeacher('48001122X');
      const newTeachers = await backend.getTeachers();
      expect(result).toBeTruthy();
      expect(teachers.length).greaterThan(newTeachers.length);
    });
    it('should throw error if teacher does not exist', async () => {
      try {
        await backend.deleteTeacher('g3c');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
