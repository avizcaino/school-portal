import {ID} from './entity';
import {IGroup} from './group';
import {IStudent} from './student';
import {ITeacher} from './teacher';

export interface ISchool {
  students: IStudent[];
  teachers: ITeacher[];
  groups: IGroup[];
}

export abstract class School {
  abstract addGroup(group: IGroup): Promise<ID>;
  abstract deleteGroup(id: string): Promise<boolean>;
  abstract getGroups(): Promise<IGroup[]>;
  abstract getGroup(id: string): Promise<IGroup>;

  abstract registerTeacher(teacher: ITeacher): Promise<ID>;
  abstract deleteTeacher(id: string): Promise<boolean>;
  abstract getTeachers(): Promise<ITeacher[]>;
  abstract getTeacher(id: string): Promise<ITeacher>;

  abstract registerStudent(student: IStudent): Promise<ID>;
  abstract deleteStudent(id: string): Promise<boolean>;
  abstract getStudents(): Promise<IStudent[]>;
  abstract getStudent(id: string): Promise<IStudent>;
}
