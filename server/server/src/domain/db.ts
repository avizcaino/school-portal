import * as _firestore from '@google-cloud/firestore';

export interface Converter<T> {
  toFirestore: (data: T[]) => T[];
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => T[];
}

export const enum DBFilterOperator {
  equals = '==',
}

export interface DBFilter {
  field: string;
  operator: DBFilterOperator;
  value: any;
}

export abstract class FirebaseDB {
  abstract getDB(): _firestore.Firestore;
  abstract getCollection<T>(collectionId: string, converter: Converter<T>): Promise<T[]>;
  abstract getDocument<T>(
    collectionId: string,
    documentId: string,
    converter: Converter<T>
  ): Promise<T>;
  abstract addDocument<T>(collectionId: string, data: T): Promise<string>;
  abstract findDocument<T>(collectionId: string, filters: DBFilter[]): Promise<T>;
  abstract deleteDocument(collectionId: string, documentId: string): Promise<boolean>;
}
