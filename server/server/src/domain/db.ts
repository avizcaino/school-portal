import * as _firestore from '@google-cloud/firestore';

export interface Converter<T> {
  toFirestore: (data: T[]) => T[];
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => T[];
}

export abstract class FirebaseDB {
  abstract getDB(): _firestore.Firestore;
  abstract getCollection<T>(collectionId: string, converter: Converter<T>): Promise<T[]>;
  abstract getDocument<T>(
    collectionId: string,
    documentId: string,
    converter: Converter<T>
  ): Promise<T>;
}
