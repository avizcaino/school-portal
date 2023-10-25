import {Entity} from './entity';

export interface IGroup extends Entity {
  grade: number;
  subGroup: string;
  name: string;
}
