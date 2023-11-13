import {GroupsBackendAdapter} from '@school-shared/core';
import 'reflect-metadata';
import {beforeAll, describe, expect, it} from 'vitest';
import {FirebaseDB} from '../../src/domain/db';
import {GroupsBackendAdapterImpl} from '../../src/infrastructure/groups-backend-adapter';
import {dummyData} from '../assets/dummy-data';
import {DummyDB} from '../assets/dummy-db';

describe('Given the groups backend adapter', () => {
  let backend: GroupsBackendAdapter, db: FirebaseDB;

  beforeAll(() => {
    db = new DummyDB(dummyData);
    backend = new GroupsBackendAdapterImpl(db);
  });
  describe('When fetching groups', () => {
    it('should return an array of groups', async () => {
      const groups = await backend.getGroups();
      expect(groups.length).toEqual(dummyData.groups.length);
    });
  });
  describe('When fetching a group', () => {
    it('should return a group with its teachers and students', async () => {
      const GROUP_ID = 'g3a';
      const defaultGroupTeachers = dummyData.teachers.filter(
        (g: any) => g.groups?.indexOf(GROUP_ID) > -1
      );
      const defaultGroupStudents = dummyData.students.filter(g => g.group === GROUP_ID);
      const group = await backend.getGroup(GROUP_ID);
      expect(group).toBeDefined();
      expect(group.teachers).toEqual(defaultGroupTeachers);
      expect(group.students).toEqual(defaultGroupStudents);
    });
    it('should throw error if group does not exists', async () => {
      const GROUP_ID = 'dummy';
      const fn = () => backend.getGroup(GROUP_ID);
      expect(fn()).rejects.toThrow();
    });
  });
  describe('When creating a group', () => {
    it('should return its id', async () => {
      const id = await backend.createGroup({
        internalId: 'g4b',
        grade: 4,
        subGroup: 'A',
        name: 'I4A',
        maxStudents: 0,
      });
      expect(id).toBeDefined();
    });
    it('should not add group if it already exists', async () => {
      const fn = () =>
        backend.createGroup({
          internalId: 'g4b',
          grade: 4,
          subGroup: 'A',
          name: 'I4A',
          maxStudents: 0,
        });
      expect(fn()).rejects.toThrow();
    });
  });
  describe('When updating a group', () => {
    it('should return new updated group', async () => {
      const group = await backend.updateGroup('g3a', {
        internalId: 'g3a',
        grade: 3,
        subGroup: 'A',
        name: 'NEW-G3A',
        maxStudents: 0,
      });

      expect(group.internalId).toEqual('g3a');
      expect(group.name).toEqual('NEW-G3A');
    });
    it('should throw error if group does not exist', async () => {
      const fn = () =>
        backend.updateGroup('g3c', {
          internalId: 'g3c',
          grade: 3,
          subGroup: 'C',
          name: 'I3C',
          maxStudents: 0,
        });
      expect(fn()).rejects.toThrow();
    });
  });
  describe('When deleting a group', () => {
    it('should return true if group exists', async () => {
      const groups = await backend.getGroups();
      const result = await backend.deleteGroup('g3a');
      const newGroups = await backend.getGroups();
      expect(result).toBeTruthy();
      expect(groups.length).greaterThan(newGroups.length);
    });
    it('should throw error if group does not exist', async () => {
      const fn = () => backend.deleteGroup('g3c');
      expect(fn()).rejects.toThrow();
    });
  });
});
