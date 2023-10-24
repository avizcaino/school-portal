import {Entity, ID} from './entity';
import {Person} from './person';

export interface IStudent extends Entity, Person {
  birthDate: Date;
  idalu: string;
  group: ID;
}

export abstract class Students {
  abstract registerStudent(student: IStudent): Promise<ID>;
  abstract deleteStudent(id: string): Promise<boolean>;
  abstract getStudents(): Promise<IStudent[]>;
  abstract getStudent(id: string): Promise<IStudent>;
}
