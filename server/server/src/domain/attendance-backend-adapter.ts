import {AttendancePayload} from '../interfaces/attendance';

export abstract class AttendanceBackendAdapter {
  abstract setStudentsAttendance(id: string, data: AttendancePayload): Promise<boolean>;
}
