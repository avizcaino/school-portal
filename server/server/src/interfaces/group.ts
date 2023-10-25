import {Entity} from './entity';
import {IStudent} from './student';
import {ITeacher} from './teacher';

export interface IGroup extends Entity {
  grade: number;
  subGroup: string;
  name: string;
  students?: IStudent[];
  teachers?: ITeacher[];
}
