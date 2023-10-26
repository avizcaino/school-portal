import {format} from 'date-fns';
import {inject, injectable} from 'inversify';
import {IStudentAttendanceRecord} from 'src/interfaces/student';
import {AttendanceBackendAdapter} from '../domain/attendance-backend-adapter';
import {ATTENDANCE_COLLECTION} from '../domain/collections';
import {DBFilterOperator, FirebaseDB} from '../domain/db';
import {AttendancePayload, AttendanceRecord} from '../interfaces/attendance';
import {provideTransient} from '../ioc';

@injectable()
@provideTransient(AttendanceBackendAdapter)
export class AttendanceBackendAdapterImpl implements AttendanceBackendAdapter {
  constructor(@inject(FirebaseDB) protected db: FirebaseDB) {}

  async setStudentAttendance(id: string, data: AttendancePayload): Promise<boolean> {
    const document = await this.db.findDocument<AttendanceRecord>(ATTENDANCE_COLLECTION, [
      {field: 'date', operator: DBFilterOperator.equals, value: format(data.date, 'yyyy-MM-dd')},
    ]);
    if (document) {
      let present = document.presentStudents.filter(sId => sId != id);
      let absents = document.absentStudents.filter(sId => sId != id);
      if (data.present) present = [...present, id];
      else absents = [...absents, id];
      await this.db.updateDocument(ATTENDANCE_COLLECTION, document?.id as string, {
        ...document,
        presentStudents: present,
        absentStudents: absents,
      });
    } else
      await this.db.addDocument<AttendanceRecord>(ATTENDANCE_COLLECTION, {
        date: format(data.date, 'yyyy-MM-dd'),
        absentStudents: !data.present ? [id] : [],
        presentStudents: data.present ? [id] : [],
      });
    return Promise.resolve(true);
  }

  async getStudentAttendance(id: string): Promise<IStudentAttendanceRecord[]> {
    const attendances = await this.db.getCollection<AttendanceRecord>(ATTENDANCE_COLLECTION);
    const studentRecords = attendances.filter(
      a => a.absentStudents.includes(id) || a.presentStudents.includes(id)
    );
    return studentRecords?.reduce<IStudentAttendanceRecord[]>(
      (att, r) =>
        att.concat({date: new Date(r.date as string), present: r.presentStudents.includes(id)}),
      []
    );
  }
}
