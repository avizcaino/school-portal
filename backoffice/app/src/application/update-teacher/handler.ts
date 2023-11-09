import {ITeacher, TeachersBackendAdapter} from '@school-server/server';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {UpdateTeacherCommand} from './command';

@injectable()
export class UpdateTeacherCommandHandler
  implements IRequestHandler<UpdateTeacherCommand, ITeacher>
{
  constructor(@inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter) {}

  handle(value: UpdateTeacherCommand): Promise<ITeacher> {
    return this.backendAdapter.updateTeacher(value.id, {
      ...value.data,
      groups: value.data.groups?.map(g => g.id),
    } as ITeacher);
  }
}
