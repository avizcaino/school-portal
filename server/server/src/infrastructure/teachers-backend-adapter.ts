import {groupBy} from '@school-shared/core/src/utils/mappers';
import {inject, injectable} from 'inversify';
import {uniq} from 'ramda';
import {GROUPS_COLLECTION, TEACHERS_COLLECTION} from '../domain/collections';
import {DBFilterOperator, FirebaseDB} from '../domain/db';
import {TeachersBackendAdapter} from '../domain/teachers-backend-adapter';
import {IGroup} from '../interfaces/group';
import {ITeacher, ITeacherExtended} from '../interfaces/teacher';

@injectable()
export class TeachersBackendAdapterImpl implements TeachersBackendAdapter {
  constructor(@inject(FirebaseDB) protected db: FirebaseDB) {}

  async getTeachers(extended?: boolean): Promise<ITeacher[] | ITeacherExtended[]> {
    const teachers = await this.db.getCollection<ITeacher>(TEACHERS_COLLECTION);
    if (!extended) return teachers;
    else {
      const teachersGroups = uniq(teachers?.map(t => t.groups)?.flat());
      const groupsDataPromises = teachersGroups.map(gId =>
        this.db.getDocument(GROUPS_COLLECTION, gId as string)
      );
      const groupsDataResults = await Promise.allSettled(groupsDataPromises);
      const groupsData: IGroup[] = groupBy('status')(groupsDataResults)?.fulfilled?.map(
        (r: PromiseFulfilledResult<IGroup>) => r.value
      );
      return teachers?.map(t => ({
        ...t,
        groups: t.groups?.map(g => groupsData.find(gd => gd.id === g)),
      })) as ITeacherExtended[];
    }
  }

  async getTeacher(id: string): Promise<ITeacherExtended> {
    const teacher = await this.db.getDocument<ITeacher>(TEACHERS_COLLECTION, id);
    const teacherGroupsPromises = (teacher.groups || [])?.map(g =>
      this.db.getDocument<IGroup>(GROUPS_COLLECTION, g as string)
    );
    const groups = await Promise.all(teacherGroupsPromises);
    return {...teacher, groups};
  }

  async registerTeacher(teacher: ITeacher): Promise<string> {
    const exists = await this.db.findDocument(TEACHERS_COLLECTION, [
      {field: 'internalId', operator: DBFilterOperator.equals, value: teacher.internalId},
    ]);
    if (exists) throw new Error(`Teacher with ID ${teacher.internalId} already exists`);
    else return this.db.addDocument<ITeacher>(TEACHERS_COLLECTION, teacher);
  }

  async updateTeacher(id: string, teacher: ITeacher): Promise<ITeacher> {
    return await this.db.updateDocument<ITeacher>(TEACHERS_COLLECTION, id, teacher);
  }

  async deleteTeacher(id: string): Promise<boolean> {
    return await this.db.deleteDocument(TEACHERS_COLLECTION, id);
  }
}
