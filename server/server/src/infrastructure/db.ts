import * as _firestore from '@google-cloud/firestore';
import admin, {ServiceAccount} from 'firebase-admin';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {injectable} from 'inversify';
import serviceAccount from '../../serviceAccountKey.json';
import {firebaseConfig} from '../config';
import {Converter, FirebaseDB} from '../domain/db';
import {provideTransient} from '../ioc';

@injectable()
@provideTransient(FirebaseDB)
export class FirebaseDBImpl implements FirebaseDB {
  private db: _firestore.Firestore;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
    firebase.initializeApp(firebaseConfig);
    this.db = admin.firestore();
  }

  getDB(): _firestore.Firestore {
    return this.db;
  }

  async getCollection<T>(collectionId: string, converter: Converter<T>): Promise<T[]> {
    const snapshot = await this.db.collection(collectionId).withConverter(converter).get();
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as T[];
  }

  async getDocument<T>(
    collectionId: string,
    documentId: string,
    converter: Converter<T>
  ): Promise<T> {
    const snapshot = await this.db
      .collection(collectionId)
      .doc(documentId)
      .withConverter(converter)
      .get();
    return snapshot.data() as T;
  }
}
