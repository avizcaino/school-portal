import {Entity, ID} from './entity';

export interface AttendanceRecord extends Entity {
  date: Date | string;
  presentStudents: ID[];
  absentStudents: ID[];
}

export type AttendanceRecordType = {[id: string]: AttendanceRecord[]};

export interface AttendancePayload {
  date: Date;
  present: boolean;
}
