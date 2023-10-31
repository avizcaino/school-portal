import Chance from 'chance';
import {uniq} from 'ramda';
import {IGroup, IStudent, ITeacher} from 'src/interfaces';
import {StudentsBackendAdapter} from '../domain/students-backend-adapter';
import {TeachersBackendAdapter} from '../domain/teachers-backend-adapter';

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

const getTeacherGroups = (groups: IGroup[]) => {
  const groupsCount = chance.integer({min: 1, max: 3});
  const teacherGroups: string[] = [];
  for (let i = 0; i < groupsCount; i++) {
    const index = chance.integer({min: 0, max: groups.length - 1});
    teacherGroups.push(groups[index]?.id as string);
  }
  return teacherGroups;
};

export const teachersBatchInput = (groups: IGroup[], backendAdapter: TeachersBackendAdapter) => {
  for (let i = 0; i < 30; i++) {
    const name = chance.name({nationality: 'it'});
    const teacher: ITeacher = {
      internalId: chance.ssn(),
      name: name?.split(' ')[0],
      firstSurname: name?.split(' ')[1],
      groups: uniq(getTeacherGroups(groups)),
    };
    backendAdapter
      .registerTeacher(teacher)
      .then(r => console.log(`Teacher with ID ${r} registered successfully!`));
  }
};
