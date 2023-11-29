import {IRequest} from 'mediatr-ts';

export class DeleteTeacherCommand implements IRequest<boolean> {
  constructor(id: string) {
    this.id = id;
  }

  id: string;
}
