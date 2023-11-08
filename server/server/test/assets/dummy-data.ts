import {
  GROUPS_COLLECTION,
  STUDENTS_COLLECTION,
  TEACHERS_COLLECTION,
} from '../../src/domain/collections';
import {DummyDBData} from './dummy-db';

export const dummyData: DummyDBData = {
  [GROUPS_COLLECTION]: [
    {id: 'g3a', internalId: 'g3a', grade: 3, subGroup: 'A', name: 'I3A', maxStudents: 100},
    {id: 'g3b', internalId: 'g3b', grade: 3, subGroup: 'B', name: 'I3B', maxStudents: 100},
    {
      id: 'full-group',
      internalId: 'full-group',
      grade: 1,
      subGroup: 'A',
      name: 'Full Group',
      maxStudents: 0,
    },
  ],
  [TEACHERS_COLLECTION]: [
    {
      id: '48001122X',
      name: 'John',
      firstSurname: 'Doe',
      internalId: '48001122X',
      groups: ['g3a', 'g3b'],
    },
    {id: '49003344Y', name: 'Jane', firstSurname: 'Doe', internalId: '49003344Y', groups: ['g3b']},
  ],
  [STUDENTS_COLLECTION]: [
    {
      name: 'Peter',
      firstSurname: 'Smith',
      id: '00112233A',
      internalId: '00112233A',
      birthDate: new Date(),
      group: 'g3a',
    },
    {
      name: 'Pat',
      firstSurname: 'Smith',
      id: '44556677B',
      internalId: '44556677B',
      birthDate: new Date(),
      group: 'g3a',
    },
    {
      name: 'David',
      firstSurname: 'James',
      id: '88990000C',
      internalId: '88990000C',
      birthDate: new Date(),
      group: 'g3b',
    },
  ],
};
