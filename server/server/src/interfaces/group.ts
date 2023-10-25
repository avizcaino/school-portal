import {Entity, ID} from './entity';

export interface IGroup extends Entity {
  grade: number;
  subGroup: string;
  name: string;
  students?: ID[];
  teachers?: ID[];
}
