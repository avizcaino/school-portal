import {TeachersBackendAdapter} from '@school-shared/core';
import {inject, injectable} from 'inversify';
import {IRequestHandler} from 'mediatr-ts';
import {DeleteTeacherCommand} from './command';

@injectable()
export class DeleteTeacherCommandHandler implements IRequestHandler<DeleteTeacherCommand, boolean> {
  constructor(@inject(TeachersBackendAdapter) protected backendAdapter: TeachersBackendAdapter) {}

  handle(value: DeleteTeacherCommand): Promise<boolean> {
    return this.backendAdapter.deleteTeacher(value.id);
  }
}
