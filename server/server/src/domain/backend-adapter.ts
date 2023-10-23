export abstract class BackendAdapter {
  abstract getCollection<T>(collectionId: string): Promise<T[]>;
  abstract getDocument<T>(collectionId: string, documentId: string): Promise<T>;
  abstract deleteDocument(collectionId: string, documentId: string): Promise<any>;
}
