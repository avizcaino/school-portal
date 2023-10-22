import {FirebaseProvider} from '@school-portal/core';
import {UserCredential} from 'firebase/auth';
import {inject, injectable} from 'inversify';
import {IRequestHandler, requestHandler} from 'mediatr-ts';
import {LoginCommand} from './command';

@injectable()
@requestHandler(LoginCommand)
export class LoginCommandHandler implements IRequestHandler<LoginCommand, UserCredential> {
  constructor(@inject(FirebaseProvider) protected fbp: FirebaseProvider) {}

  handle(): Promise<UserCredential> {
    return this.fbp.login();
  }
}
