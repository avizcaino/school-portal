import 'reflect-metadata';
import {beforeAll, describe, expect, it} from 'vitest';
import {BackendAdapter} from '../../src/domain/backend-adapter';
import {Converter, DBFilter, FirebaseDB} from '../../src/domain/db';
import {BackendAdapterImpl} from '../../src/infrastructure/backend-adapter';
import {Generic} from '../../src/interfaces/entity';
import {Person} from '../../src/interfaces/person';

const COLLECTION_ID = 'dummy-collection';

class TestDB implements FirebaseDB {
  constructor(private data: any) {}

  getDB(): FirebaseFirestore.Firestore {
    throw new Error('Method not implemented.');
  }
  getCollection<T>(collectionId: string, converter: Converter<T>): Promise<T[]> {
    return Promise.resolve(this.data);
  }
  getDocument<T>(collectionId: string, documentId: string, converter: Converter<T>): Promise<T> {
    return Promise.resolve(this.data.find(d => d.id === documentId));
  }
  addDocument<T>(collectionId: string, data: T): Promise<string> {
    this.data.push({id: 'dummy-id', ...data});
    return Promise.resolve('dummy-id');
  }
  findDocument<T>(collectionId: string, filters: DBFilter[]): Promise<T> {
    return this.data.find(d => d.documentId === filters[0].value);
  }
  updateDocument<T extends Generic>(collectionId: string, id: string, data: T): Promise<T> {
    this.data = this.data.map(d => d.id === id && {...d, ...data});
    return this.data.find(d => d.id === id);
  }
  deleteDocument(collectionId: string, documentId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

describe('Given a backend adapter', () => {
  let backendAdapter: BackendAdapter, db: FirebaseDB;
  const dummyDocument = {foo: 'bar'};
  const dummyPerson: Person = {documentId: 'dummy-id', name: 'John', firstSurname: 'Doe'};
  const data: any[] = [];
  beforeAll(() => {
    db = new TestDB(data);
    backendAdapter = new BackendAdapterImpl(db);
  });
  describe('When getting collection', () => {
    it('Should return collection', async () => {
      const result = await backendAdapter.getCollection(COLLECTION_ID);
      expect(result).toEqual(data);
    });
  });
  describe('When getting a document from collection', () => {
    it('Should return all document data', async () => {
      const result = await backendAdapter.getDocument(COLLECTION_ID, 'dummy-id');
      expect(result).toEqual(data.find(d => d.id === 'dummy-id'));
    });
  });
  describe('When adding document to collection', () => {
    it('Should return id', async () => {
      const result = await backendAdapter.addDocument(COLLECTION_ID, dummyDocument);
      expect(result).toEqual('dummy-id');
    });
    it('Should add data to collection', async () => {
      const documents = await backendAdapter.getCollection(COLLECTION_ID);
      expect(documents).toEqual(data);
    });
  });
  describe('When adding a person to collection', () => {
    it('Should return id', async () => {
      const result = await backendAdapter.addPerson(COLLECTION_ID, dummyPerson);
      expect(result).toEqual('dummy-id');
    });
    it('Should add data to collection', async () => {
      const documents = await backendAdapter.getCollection(COLLECTION_ID);
      expect(documents).toEqual(data);
      expect(
        (documents as Person[]).find(d => d.documentId === dummyPerson.documentId)
      ).toBeDefined();
    });

    describe('And document key already exists', () => {
      it('Should return id of original document', async () => {
        const exists = await backendAdapter.addPerson(COLLECTION_ID, {
          ...dummyPerson,
          name: 'Jane',
        });
        expect(exists).toEqual('dummy-id');
      });
      it('Should not add new document', async () => {
        const documents = await backendAdapter.getCollection(COLLECTION_ID);
        expect(
          (documents as Person[]).find(d => d.documentId === dummyPerson.documentId)?.name
        ).toEqual(dummyPerson.name);
      });
    });
  });
  describe('When updating person', () => {
    it('should return updated person', async () => {
      const result = await backendAdapter.updateDocument(COLLECTION_ID, 'dummy-id', {
        ...dummyPerson,
        name: 'Jane',
      });
      expect(result.name).toEqual('Jane');
    });
  });
});
