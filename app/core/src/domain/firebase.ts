import {UserCredential} from 'firebase/auth';

export abstract class FirebaseProvider {
  abstract login(): Promise<UserCredential>;
}
