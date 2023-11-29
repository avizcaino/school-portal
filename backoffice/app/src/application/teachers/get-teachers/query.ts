import {ITeacher} from '@school-shared/core';
import {IRequest} from 'mediatr-ts';

export class TeachersQuery implements IRequest<ITeacher[]> {}
