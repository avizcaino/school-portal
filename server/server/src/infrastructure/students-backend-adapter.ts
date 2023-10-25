import {inject, injectable} from 'inversify';
import {GROUPS_COLLECTION, STUDENTS_COLLECTION} from '../domain/collections';
import {DBFilterOperator, FirebaseDB} from '../domain/db';
import {StudentsBackendAdapter} from '../domain/students-backend-adapter';
import {IGroup} from '../interfaces/group';
import {IStudent, IStudentExtended} from '../interfaces/student';
import {provideTransient} from '../ioc';

@injectable()
@provideTransient(StudentsBackendAdapter)
export class StudentsBackendAdapterImpl implements StudentsBackendAdapter {
  constructor(@inject(FirebaseDB) protected db: FirebaseDB) {}

  async getStudents(): Promise<IStudent[]> {
    return await this.db.getCollection(STUDENTS_COLLECTION);
  }

  async getStudent(id: string): Promise<IStudentExtended> {
    const student = await this.db.getDocument<IStudent>(STUDENTS_COLLECTION, id);
    const group = await this.db.getDocument<IGroup>(GROUPS_COLLECTION, student?.group);
    return {...student, group};
  }

  async registerStudent(group: IStudent): Promise<string> {
    const exists = await this.db.findDocument(STUDENTS_COLLECTION, [
      {field: 'internalId', operator: DBFilterOperator.equals, value: group.internalId},
    ]);
    if (exists) throw new Error(`Group with ID ${group.internalId} already exists`);
    else return this.db.addDocument<IStudent>(STUDENTS_COLLECTION, group);
  }

  updateStudent(id: string, group: IStudent): Promise<IStudent> {
    return this.db.updateDocument<IStudent>(STUDENTS_COLLECTION, id, group);
  }

  deleteStudent(id: string): Promise<boolean> {
    return this.db.deleteDocument(STUDENTS_COLLECTION, id);
  }
}
