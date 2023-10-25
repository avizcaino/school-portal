import {Person} from '../interfaces/person';
export abstract class BackendAdapter {
  abstract getCollection<T>(collectionId: string): Promise<T[]>;
  abstract getDocument<T>(collectionId: string, documentId: string): Promise<T>;
  abstract addDocument<T>(collectionId: string, data: T): Promise<string>;
  abstract addPerson<T extends Person>(collectionId: string, data: T): Promise<string>;
  abstract updatePerson<T extends Person>(collectionId: string, id: string, data: T): Promise<T>;
  abstract deleteDocument(collectionId: string, documentId: string): Promise<boolean>;
}
