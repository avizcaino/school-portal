import {ITeacher, ITeacherExtended} from '@school-server/server';
import {IRequest} from 'mediatr-ts';

export class UpdateTeacherCommand implements IRequest<ITeacherExtended> {
  constructor(id: string, data: ITeacher) {
    this.id = id;
    this.data = data;
  }

  id: string;
  data: ITeacher;
}
