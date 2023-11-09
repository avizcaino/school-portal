import {ITeacher, ITeacherExtended} from '@school-server/server';
import {IRequest} from 'mediatr-ts';

export class UpdateTeacherCommand implements IRequest<ITeacher> {
  constructor(id: string, data: ITeacherExtended) {
    this.id = id;
    this.data = data;
  }

  id: string;
  data: ITeacherExtended;
}
