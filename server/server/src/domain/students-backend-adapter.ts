import {IStudent, IStudentExtended} from '../interfaces/student';

export abstract class StudentsBackendAdapter {
  abstract getStudents(): Promise<IStudent[]>;
  abstract getStudent(id: string): Promise<IStudentExtended>;
  abstract registerStudent(group: IStudent): Promise<string>;
  abstract updateStudent(id: string, group: IStudent): Promise<IStudent>;
  abstract deleteStudent(id: string): Promise<boolean>;
}
