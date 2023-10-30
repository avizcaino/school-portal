import {inject, injectable} from 'inversify';
import {GROUPS_COLLECTION, STUDENTS_COLLECTION, TEACHERS_COLLECTION} from '../domain/collections';
import {DBFilterOperator, FirebaseDB} from '../domain/db';
import {GroupsBackendAdapter} from '../domain/groups-backend-adapter';
import {IGroup} from '../interfaces/group';
import {IStudent} from '../interfaces/student';
import {ITeacher} from '../interfaces/teacher';
import {provideTransient} from '../ioc';

@injectable()
@provideTransient(GroupsBackendAdapter)
export class GroupsBackendAdapterImpl implements GroupsBackendAdapter {
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

  async createGroup(group: IGroup): Promise<string> {
    const exists = await this.db.findDocument(GROUPS_COLLECTION, [
      {field: 'grade', operator: DBFilterOperator.equals, value: group.grade},
      {field: 'subGroup', operator: DBFilterOperator.equals, value: group.subGroup},
    ]);
    if (exists) throw new Error(`Group ${group.grade}:${group.subGroup} already exists`);
    else return this.db.addDocument<IGroup>(GROUPS_COLLECTION, group);
  }

  updateGroup(id: string, group: IGroup): Promise<IGroup> {
    return this.db.updateDocument<IGroup>(GROUPS_COLLECTION, id, group);
  }
  deleteGroup(id: string): Promise<boolean> {
    return this.db.deleteDocument(GROUPS_COLLECTION, id);
  }
}
