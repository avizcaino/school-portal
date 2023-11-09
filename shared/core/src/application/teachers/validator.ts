import {ITeacher} from '@school-server/server';
import {IsArray, IsNotEmpty, IsOptional} from 'class-validator';

export class TeacherValidator implements ITeacher {
  constructor(data: ITeacher) {
    Object.assign(this, data);
  }

  [id: string]: unknown;

  @IsOptional()
  id?: string | undefined;

  @IsNotEmpty()
  internalId!: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  firstSurname!: string;

  @IsOptional()
  secondSurname?: string;

  @IsOptional()
  profilePic?: string;

  @IsOptional()
  @IsArray()
  groups?: string[];
}
