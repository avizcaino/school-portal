import Chance from 'chance';
import {IGroup, IStudent} from 'src/interfaces';
import {StudentsBackendAdapter} from '../domain/students-backend-adapter';

const chance = new Chance();

export const studentsBatchInput = (groups: IGroup[], backendAdapter: StudentsBackendAdapter) => {
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 500; i++) {
    const name = chance.name({nationality: 'it'});
    const group = groups[chance.integer({min: 0, max: groups.length - 1})];
    const student: IStudent = {
      internalId: chance.ssn(),
      birthDate: chance.date({year: currentYear - group.grade}) as Date,
      group: group.id as string,
      name: name.split(' ')[0],
      firstSurname: name.split(' ')[1],
    };
    backendAdapter
      .registerStudent(student)
      .then(r => console.log(`Student with ID ${r} registered successfully!`));
  }
};
