import {ITeacher, ITeacherExtended} from '../interfaces/teacher';

export abstract class TeachersBackendAdapter {
  abstract getTeachers(): Promise<ITeacher[]>;
  abstract getTeacher(id: string): Promise<ITeacherExtended>;
  abstract registerTeacher(group: ITeacher): Promise<string>;
  abstract updateTeacher(id: string, group: ITeacher): Promise<ITeacher>;
  abstract deleteTeacher(id: string): Promise<boolean>;
}
