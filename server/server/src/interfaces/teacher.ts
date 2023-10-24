import {Entity, ID} from './entity';
import {Person} from './person';

export interface ITeacher extends Entity, Person {
  idDocument: string;
  groups: ID[];
}

export abstract class Teachers {
  abstract registerTeacher(teacher: ITeacher): Promise<ID>;
  abstract deleteTeacher(id: string): Promise<boolean>;
  abstract getTeachers(): Promise<ITeacher[]>;
  abstract getTeacher(id: string): Promise<ITeacher>;
}
