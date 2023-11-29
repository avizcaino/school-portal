import {IStudent} from '@school-shared/core';
import {IsDate, IsNotEmpty, IsOptional} from 'class-validator';

export class StudentValidator implements IStudent {
  constructor(data: IStudent) {
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
  group!: string;

  @IsDate()
  birthDate!: Date;

  @IsNotEmpty()
  firstSurname!: string;

  @IsOptional()
  secondSurname?: string;

  @IsOptional()
  profilePic?: string;
}
