import * as _firestore from '@google-cloud/firestore';
import admin, {ServiceAccount} from 'firebase-admin';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {injectable} from 'inversify';
import serviceAccount from '../../serviceAccountKey.json';
import {firebaseConfig} from '../config';
import {Converter, DBFilter, FirebaseDB} from '../domain/db';
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

  async addDocument<T>(collectionId: string, data: T): Promise<string> {
    try {
      const documentRef = await this.db.collection(collectionId).add(data as any);
      return documentRef.id;
    } catch (error: any) {
      throw new Error(`Failed to add document: ${error.message}`);
    }
  }

  async findDocument<T>(collectionId: string, filters: DBFilter[]): Promise<T> {
    try {
      const collectionRef = await this.db.collection(collectionId);
      let query: any = collectionRef;
      filters?.forEach(f => {
        query = query.where(f.field, f.operator, f.value);
      });
      const results: T[] = [];
      (await query.get()).forEach((d: any) => results.push({id: d.id, ...(d.data() as T)}));
      return results[0];
    } catch (error: any) {
      throw new Error(`Failed to find document: ${error.message}`);
    }
  }

  async deleteDocument(collectionId: string, documentId: string): Promise<boolean> {
    try {
      const documentRef = this.db.collection(collectionId).doc(documentId);
      await documentRef.delete();
      return true;
    } catch (error: any) {
      throw new Error(`Failed to delete document: ${error.message}`);
    }
  }
}
