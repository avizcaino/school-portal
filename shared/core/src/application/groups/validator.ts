import {IGroup, IStudent, ITeacher} from '@school-server/server';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class GroupValidator implements IGroup {
  constructor(data: IGroup) {
    Object.assign(this, data);
  }

  [id: string]: unknown;

  @IsNotEmpty()
  grade!: number;

  @IsNotEmpty()
  subGroup!: string;

  @IsNotEmpty()
  name!: string;

  @IsOptional()
  // @IsInstance(StudentValidator)
  students?: IStudent[];

  @IsOptional()
  teachers?: ITeacher[];

  @IsOptional()
  id?: string;

  @IsOptional()
  internalId?: string;
}
