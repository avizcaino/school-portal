import {ITeacher} from '@school-server/server';
import {IRequest} from 'mediatr-ts';

export class TeachersQuery implements IRequest<ITeacher[]> {}
