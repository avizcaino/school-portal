import {AttendancePayload} from '../../../../shared/core/src/interfaces/attendance';
import {IStudentAttendanceRecord} from '../../../../shared/core/src/interfaces/student';

export abstract class AttendanceBackendAdapter {
  abstract setStudentAttendance(id: string, data: AttendancePayload): Promise<boolean>;
  abstract getStudentAttendance(id: string): Promise<IStudentAttendanceRecord[]>;
}
