import {inject} from 'inversify';
import {IGroup} from 'src/interfaces/group';
import {IStudent} from 'src/interfaces/student';
import {GROUPS_COLLECTION, STUDENTS_COLLECTION, TEACHERS_COLLECTION} from '../domain/collections';
import {DBFilterOperator, FirebaseDB} from '../domain/db';
import {SchoolBackendAdapter} from '../domain/school-backend-adapter';
import {ITeacher} from '../interfaces/teacher';

export class SchoolBackendAdapterImpl implements SchoolBackendAdapter {
  constructor(@inject(FirebaseDB) protected db: FirebaseDB) {}

  async getGroups(): Promise<IGroup[]> {
    return await this.db.getCollection(GROUPS_COLLECTION);
  }

  async getGroup(id: string): Promise<IGroup> {
    const group = await this.db.getDocument<IGroup>(GROUPS_COLLECTION, id);
    if (group) {
      const teachers = await this.db.findDocuments<ITeacher>(TEACHERS_COLLECTION, [
        {field: 'groups', operator: DBFilterOperator.contains, value: id},
      ]);
      const students = await this.db.findDocuments<IStudent>(STUDENTS_COLLECTION, [
        {field: 'group', operator: DBFilterOperator.equals, value: id},
      ]);
      return {...group, teachers, students};
    } else throw new Error(`Couldn't find group ${id}`);
  }
}
