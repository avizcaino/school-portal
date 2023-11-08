import {groupBy} from '@school-shared/core/src/utils/mappers';
import {inject, injectable} from 'inversify';
import {GROUPS_COLLECTION, STUDENTS_COLLECTION} from '../domain/collections';
import {DBFilterOperator, FirebaseDB} from '../domain/db';
import {StudentsBackendAdapter} from '../domain/students-backend-adapter';
import {IGroup} from '../interfaces/group';
import {IStudent, IStudentExtended} from '../interfaces/student';

@injectable()
export class StudentsBackendAdapterImpl implements StudentsBackendAdapter {
  constructor(@inject(FirebaseDB) protected db: FirebaseDB) {}

  async getStudents(extended?: boolean): Promise<IStudent[] | IStudentExtended[]> {
    const students = await this.db.getCollection<IStudent>(STUDENTS_COLLECTION);
    if (!extended) return students;
    else {
      const studentsGroups = Object.keys(groupBy('group')(students));
      const groupsDataPromises = studentsGroups.map(gId =>
        this.db.getDocument(GROUPS_COLLECTION, gId)
      );
      const groupsDataResults = await Promise.allSettled(groupsDataPromises);
      const groupsData: IGroup[] = groupBy('status')(groupsDataResults)?.fulfilled?.map(
        (r: PromiseFulfilledResult<IGroup>) => r.value
      );
      return students?.map(s => ({
        ...s,
        group: groupsData?.find(g => g.id === s.group),
      })) as IStudentExtended[];
    }
  }

  async getStudent(id: string): Promise<IStudentExtended> {
    const student = await this.db.getDocument<IStudent>(STUDENTS_COLLECTION, id);
    if (student) {
      const group = await this.db.getDocument<IGroup>(GROUPS_COLLECTION, student?.group as string);
      return {...student, group};
    } else throw new Error(`Student with ID ${id} does not exists`);
  }

  async registerStudent(student: IStudent): Promise<string> {
    const exists = await this.db.findDocument(STUDENTS_COLLECTION, [
      {field: 'internalId', operator: DBFilterOperator.equals, value: student.internalId},
    ]);
    if (exists) throw new Error(`Student with ID ${student.internalId} already exists`);
    else {
      const group = await this.db.getDocument<IGroup>(GROUPS_COLLECTION, student.group as string);
      const students = await this.db.findDocuments<IStudent>(STUDENTS_COLLECTION, [
        {field: 'group', operator: DBFilterOperator.equals, value: group.id},
      ]);
      if (group.maxStudents > students?.length)
        return this.db.addDocument<IStudent>(STUDENTS_COLLECTION, student);
      else throw new Error(`Group with ID ${group.internalId} is already full`);
    }
  }

  async updateStudent(id: string, student: IStudent): Promise<IStudent> {
    return await this.db.updateDocument<IStudent>(STUDENTS_COLLECTION, id, student);
  }

  async deleteStudent(id: string): Promise<boolean> {
    return await this.db.deleteDocument(STUDENTS_COLLECTION, id);
  }
}
