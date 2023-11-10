import {ITeacher, ITeacherExtended} from '../interfaces/teacher';

export abstract class TeachersBackendAdapter {
  abstract getTeachers(extended?: boolean): Promise<ITeacher[] | ITeacherExtended[]>;
  abstract getTeacher(id: string): Promise<ITeacherExtended>;
  abstract registerTeacher(teacher: ITeacher): Promise<string>;
  abstract updateTeacher(id: string, teacher: ITeacher): Promise<ITeacher>;
  abstract deleteTeacher(id: string): Promise<boolean>;
}
