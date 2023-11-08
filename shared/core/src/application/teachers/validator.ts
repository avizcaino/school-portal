import {ITeacher} from '@school-server/server';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class TeacherValidator implements ITeacher {
  constructor(data: ITeacher) {
    Object.assign(this, data);
  }

  [id: string]: unknown;

  @IsOptional()
  id?: string | undefined;

  @IsOptional()
  internalId?: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  firstSurname!: string;

  @IsOptional()
  secondSurname?: string;

  @IsOptional()
  profilePic?: string;

  @IsOptional()
  groups?: string[];
}
