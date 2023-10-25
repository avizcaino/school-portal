import {inject, injectable} from 'inversify';
import {GROUPS_COLLECTION, TEACHERS_COLLECTION} from '../domain/collections';
import {DBFilterOperator, FirebaseDB} from '../domain/db';
import {TeachersBackendAdapter} from '../domain/teachers-backend-adapter';
import {IGroup} from '../interfaces/group';
import {ITeacher, ITeacherExtended} from '../interfaces/teacher';
import {provideTransient} from '../ioc';

@injectable()
@provideTransient(TeachersBackendAdapter)
export class TeachersBackendAdapterImpl implements TeachersBackendAdapter {
  constructor(@inject(FirebaseDB) protected db: FirebaseDB) {}

  async getTeachers(): Promise<ITeacher[]> {
    return await this.db.getCollection(TEACHERS_COLLECTION);
  }

  async getTeacher(id: string): Promise<ITeacherExtended> {
    const teacher = await this.db.getDocument<ITeacher>(TEACHERS_COLLECTION, id);
    const teacherGroupsPromises = (teacher.groups || [])?.map(g =>
      this.db.getDocument<IGroup>(GROUPS_COLLECTION, g)
    );
    const groups = await Promise.all(teacherGroupsPromises);
    return {...teacher, groups};
  }

  async registerTeacher(group: ITeacher): Promise<string> {
    const exists = await this.db.findDocument(TEACHERS_COLLECTION, [
      {field: 'internalId', operator: DBFilterOperator.equals, value: group.internalId},
    ]);
    if (exists) throw new Error(`Group with ID ${group.internalId} already exists`);
    else return this.db.addDocument<ITeacher>(TEACHERS_COLLECTION, group);
  }

  updateTeacher(id: string, group: ITeacher): Promise<ITeacher> {
    return this.db.updateDocument<ITeacher>(TEACHERS_COLLECTION, id, group);
  }

  deleteTeacher(id: string): Promise<boolean> {
    return this.db.deleteDocument(TEACHERS_COLLECTION, id);
  }
}
