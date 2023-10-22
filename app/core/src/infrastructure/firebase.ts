import {UserCredential} from '@firebase/auth';
import {provideSingleton} from '@uxland/ioc';
import {injectable} from 'inversify';
import {FirebaseProvider} from '../domain/firebase';

@injectable()
@provideSingleton(FirebaseProvider)
export class FirebaseProviderImpl implements FirebaseProvider {
  login(): Promise<UserCredential> {
    throw new Error('Method not implemented.');
  }
}
