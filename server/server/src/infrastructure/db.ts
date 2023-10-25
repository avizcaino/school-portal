import * as _firestore from '@google-cloud/firestore';
import admin, {ServiceAccount} from 'firebase-admin';
import 'firebase/firestore';
import {injectable} from 'inversify';
import serviceAccount from '../../serviceAccountKey.json';
import {Converter, DBFilter, FirebaseDB} from '../domain/db';
import {Generic} from '../interfaces/entity';
import {provideTransient} from '../ioc';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
// firebase.initializeApp(firebaseConfig);
const db: _firestore.Firestore = admin.firestore();

@injectable()
@provideTransient(FirebaseDB)
export class FirebaseDBImpl implements FirebaseDB {
  getDB(): _firestore.Firestore {
    return db;
  }

  async getCollection<T>(collectionId: string, converter: Converter<T>): Promise<T[]> {
    const snapshot = await db.collection(collectionId).withConverter(converter).get();
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as T[];
  }

  async getDocument<T>(
    collectionId: string,
    documentId: string,
    converter: Converter<T>
  ): Promise<T> {
    const snapshot = await db
      .collection(collectionId)
      .doc(documentId)
      .withConverter(converter)
      .get();
    return {id: snapshot.id, ...snapshot.data()} as T;
  }

  async addDocument<T>(collectionId: string, data: T): Promise<string> {
    try {
      const documentRef = await db.collection(collectionId).add(data as any);
      return documentRef.id;
    } catch (error: any) {
      throw new Error(`Failed to add document: ${error.message}`);
    }
  }

  async findDocument<T>(collectionId: string, filters: DBFilter[]): Promise<T> {
    try {
      const collectionRef = await db.collection(collectionId);
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

  async findDocuments<T>(collectionId: string, filters: DBFilter[]): Promise<T[]> {
    try {
      const collectionRef = await db.collection(collectionId);
      let query: any = collectionRef;
      filters?.forEach(f => {
        query = query.where(f.field, f.operator, f.value);
      });
      const results: T[] = [];
      (await query.get()).forEach((d: any) => results.push({id: d.id, ...(d.data() as T)}));
      return results;
    } catch (error: any) {
      throw new Error(`Failed to find document: ${error.message}`);
    }
  }

  async updateDocument<T extends Generic>(collectionId: string, id: string, data: T): Promise<T> {
    try {
      const documentRef = await db.collection(collectionId).doc(id);
      await documentRef.update(data);
      return await documentRef.get().then(d => d.data() as T);
    } catch (error: any) {
      throw new Error(`Failed to update document: ${error.message}`);
    }
  }

  async deleteDocument(collectionId: string, documentId: string): Promise<boolean> {
    try {
      const documentRef = db.collection(collectionId).doc(documentId);
      await documentRef.delete();
      return true;
    } catch (error: any) {
      throw new Error(`Failed to delete document: ${error.message}`);
    }
  }
}
