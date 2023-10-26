import {AttendancePayload} from '../interfaces/attendance';
import {IStudentAttendanceRecord} from '../interfaces/student';

export abstract class AttendanceBackendAdapter {
  abstract setStudentAttendance(id: string, data: AttendancePayload): Promise<boolean>;
  abstract getStudentAttendance(id: string): Promise<IStudentAttendanceRecord[]>;
}
