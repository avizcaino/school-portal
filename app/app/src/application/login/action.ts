import {LoginCommand} from './command';
import {Mediator} from 'mediatr-ts';

export const doLogin = () => new Mediator().send(new LoginCommand());
