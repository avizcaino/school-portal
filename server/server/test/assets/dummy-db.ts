import {
  GROUPS_COLLECTION,
  STUDENTS_COLLECTION,
  TEACHERS_COLLECTION,
} from '../../src/domain/collections';
import {Converter, DBFilter, FirebaseDB} from '../../src/domain/db';
import {Generic} from '../../src/interfaces/entity';
import {IGroup} from '../../src/interfaces/group';
import {IStudent} from '../../src/interfaces/student';
import {ITeacher} from '../../src/interfaces/teacher';
import {applyFilter} from '../utils';

export interface DummyDBData {
  [GROUPS_COLLECTION]: IGroup[];
  [TEACHERS_COLLECTION]: ITeacher[];
  [STUDENTS_COLLECTION]: IStudent[];
}

export class DummyDB implements FirebaseDB {
  constructor(private data: DummyDBData) {}

  getDB(): FirebaseFirestore.Firestore {
    throw new Error('Method not implemented.');
  }
  getCollection<T>(collectionId: string, converter?: Converter<T>): Promise<T[]> {
    return Promise.resolve(this.data[collectionId]);
  }
  getDocument<T>(collectionId: string, documentId: string, converter?: Converter<T>): Promise<T> {
    return Promise.resolve(this.data[collectionId]?.find(d => d.id === documentId));
  }
  addDocument<T>(collectionId: string, data: T): Promise<string> {
    this.data[collectionId]?.push(data);
    return Promise.resolve('dummy-id');
  }
  findDocument<T>(collectionId: string, filters?: DBFilter[]): Promise<T> {
    return Promise.resolve(
      this.data[collectionId]?.find(d => filters?.every(f => applyFilter(d, f)))
    );
  }
  findDocuments<T>(collectionId: string, filters?: DBFilter[]): Promise<T[]> {
    return Promise.resolve(
      this.data[collectionId].filter(d => filters?.every(f => applyFilter(d, f)))
    );
  }
  updateDocument<T extends Generic>(collectionId: string, id: string, data: T): Promise<T> {
    const document = this.data[collectionId]?.find(g => g.id === id);
    if (document) {
      this.data[collectionId] = this.data[collectionId]?.map(i => {
        if (i.id === id) i = {...i, ...data};
        return i;
      });
      return {...document, ...data};
    } else throw new Error(`Document with ID ${id} not found`);
  }
  deleteDocument(collectionId: string, id: string): Promise<boolean> {
    const index = this.data[collectionId]?.find(g => g.id === id);
    if (index) {
      this.data[collectionId] = this.data[collectionId].slice(index, 0);
      return Promise.resolve(true);
    } else throw new Error(`Document with ID ${id} not found`);
  }
}
