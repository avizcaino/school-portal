export abstract class BackendAdapter {
  abstract getCollection<T>(collectionId: string): Promise<T[]>;
  abstract getDocument<T>(collectionId: string, documentId: string): Promise<T>;
  abstract addDocument<T>(collectionId: string, data: T): Promise<string>;
  abstract deleteDocument(collectionId: string, documentId: string): Promise<boolean>;
}
