import {IStudent} from '@school-server/server';
import {IRequest} from 'mediatr-ts';

export class StudentsQuery implements IRequest<IStudent[]> {}
