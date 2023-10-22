import {Entity} from './entity';
import {Student} from './student';

export interface Group extends Entity {
  grade: number;
  group: string;
  name: string;
  students: Student[];
}

export abstract class Group {
  abstract addStudent(student: Student): Promise<Student>;
  abstract deleteStudent(id: string): Promise<boolean>;
  abstract getStudents(): Promise<Student[]>;
  abstract getAssistance(): Promise<number>; // Returns percentage of assistance
}
