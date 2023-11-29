import {GroupValidator} from '@school-shared/core';
import {IRequest} from 'mediatr-ts';

export class CreateGroupCommand extends GroupValidator implements IRequest<string> {}
