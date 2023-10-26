import 'reflect-metadata';
import {beforeAll, describe, expect, it} from 'vitest';
import {FirebaseDB} from '../../src/domain/db';
import {StudentsBackendAdapter} from '../../src/domain/students-backend-adapter';
import {StudentsBackendAdapterImpl} from '../../src/infrastructure/students-backend-adapter';
import {dummyData} from '../assets/dummy-data';
import {DummyDB} from '../assets/dummy-db';

describe('Given the students backend adapter', () => {
  let backend: StudentsBackendAdapter, db: FirebaseDB;

  beforeAll(() => {
    db = new DummyDB(dummyData);
    backend = new StudentsBackendAdapterImpl(db);
  });
  describe('When fetching students', () => {
    it('should return an array of students', async () => {
      const students = await backend.getStudents();
      expect(students.length).toEqual(dummyData.students.length);
    });
  });
  describe('When fetching a student', () => {
    it('should return a student with its group', async () => {
      const STUDENT_ID = '00112233A';
      const defaultStudent = dummyData.students.find(t => t.id === STUDENT_ID);
      const defaultGroup = dummyData.groups.find(g => defaultStudent?.group === g.id);
      const student = await backend.getStudent(STUDENT_ID);
      expect(student).toBeDefined();
      expect(student.group).toEqual(defaultGroup);
    });
    it('should throw error if student does not exists', async () => {
      const STUDENT_ID = 'dummy';
      try {
        await backend.getStudent(STUDENT_ID);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('When creating a student', () => {
    it('should return its id', async () => {
      const id = await backend.registerStudent({
        internalId: 'new-id',
        name: 'Peter',
        firstSurname: 'Smith',
        birthDate: new Date(),
        group: 'g3a',
      });
      expect(id).toBeDefined();
    });
    it('should not add student if it already exists', async () => {
      try {
        await backend.registerStudent({
          internalId: 'new-id',
          name: 'Peter',
          firstSurname: 'Smith',
          birthDate: new Date(),
          group: 'g3a',
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('When updating a student', () => {
    it('should return new updated student', async () => {
      const student = await backend.updateStudent('00112233A', {
        internalId: '00112233A',
        name: 'Peter',
        firstSurname: 'Parker',
        birthDate: new Date(),
        group: 'g3a',
      });

      expect(student.internalId).toEqual('00112233A');
      expect(student.firstSurname).toEqual('Parker');
    });
    it('should throw error if student does not exist', async () => {
      try {
        await backend.updateStudent('48001122A', {
          internalId: '00112233A',
          name: 'Peter',
          firstSurname: 'Parker',
          birthDate: new Date(),
          group: 'g3a',
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('When deleting a student', () => {
    it('should return true if student exists', async () => {
      const students = await backend.getStudents();
      const result = await backend.deleteStudent('00112233A');
      const newTeachers = await backend.getStudents();
      expect(result).toBeTruthy();
      expect(students.length).greaterThan(newTeachers.length);
    });
    it('should throw error if student does not exist', async () => {
      try {
        await backend.deleteStudent('g3c');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
