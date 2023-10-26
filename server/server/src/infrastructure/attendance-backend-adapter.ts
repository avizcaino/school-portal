import {format} from 'date-fns';
import {inject, injectable} from 'inversify';
import {AttendanceBackendAdapter} from '../domain/attendance-backend-adapter';
import {ATTENDANCE_COLLECTION} from '../domain/collections';
import {DBFilterOperator, FirebaseDB} from '../domain/db';
import {AttendancePayload, AttendanceRecord} from '../interfaces/attendance';
import {provideTransient} from '../ioc';

@injectable()
@provideTransient(AttendanceBackendAdapter)
export class AttendanceBackendAdapterImpl implements AttendanceBackendAdapter {
  constructor(@inject(FirebaseDB) protected db: FirebaseDB) {}

  async setStudentsAttendance(id: string, data: AttendancePayload): Promise<boolean> {
    const document = await this.db.findDocument<AttendanceRecord>(ATTENDANCE_COLLECTION, [
      {field: 'date', operator: DBFilterOperator.equals, value: format(data.date, 'yyyy-MM-dd')},
    ]);
    if (document) {
      let present = document.presentStudents.filter(sId => sId != id);
      let absents = document.absentStudents.filter(sId => sId != id);
      if (data.attendance) present = [...present, id];
      else absents = [...absents, id];
      await this.db.updateDocument(ATTENDANCE_COLLECTION, document?.id as string, {
        ...document,
        presentStudents: present,
        absentStudents: absents,
      });
    } else
      await this.db.addDocument<AttendanceRecord>(ATTENDANCE_COLLECTION, {
        date: format(data.date, 'yyyy-MM-dd'),
        absentStudents: !data.attendance ? [id] : [],
        presentStudents: data.attendance ? [id] : [],
      });
    return Promise.resolve(true);
  }
}
