import {UserCredential} from '@firebase/auth';
import {provideSingleton} from '@uxland/ioc';
import {injectable} from 'inversify';
import {FirebaseProvider} from '../../../../server/server/src/interfaces/firebase';

@injectable()
@provideSingleton(FirebaseProvider)
export class FirebaseProviderImpl implements FirebaseProvider {
  login(): Promise<UserCredential> {
    throw new Error('Method not implemented.');
  }
}
