import {IRequest} from 'mediatr-ts';

export class DeleteStudentCommand implements IRequest<boolean> {
  constructor(id: string) {
    this.id = id;
  }

  id: string;
}
