import {Entity, Generic} from './entity';
import {IStudent} from './student';
import {ITeacher} from './teacher';

export interface IGroup extends Entity, Generic {
  grade: number;
  subGroup: string;
  name: string;
  maxStudents: number;
  students?: IStudent[];
  teachers?: ITeacher[];
}
