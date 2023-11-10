import {IStudent} from '@school-shared/core';
import {IRequest} from 'mediatr-ts';

export class StudentsQuery implements IRequest<IStudent[]> {}
