import {inject, injectable} from 'inversify';
import {BackendAdapter} from '../domain/backend-adapter';
import {DBFilterOperator, FirebaseDB} from '../domain/db';
import {Person} from '../interfaces/person';
import {provideTransient} from '../ioc';
import {getCollectionConverter} from '../mappers/collection-converter';

@injectable()
@provideTransient(BackendAdapter)
export class BackendAdapterImpl implements BackendAdapter {
  constructor(@inject(FirebaseDB) protected db: FirebaseDB) {}

  async getCollection<T>(collectionId: string): Promise<T[]> {
    return await this.db.getCollection<T>(collectionId, getCollectionConverter<T>());
  }

  async getDocument<T>(collectionId: string, documentId: string): Promise<T> {
    return await this.db.getDocument<T>(collectionId, documentId, getCollectionConverter<T>());
  }

  async addDocument<T>(collectionId: string, data: T): Promise<string> {
    return await this.db.addDocument(collectionId, data);
  }

  async addPerson<T extends Person>(collectionId: string, data: T): Promise<string> {
    const exists: T = await this.db.findDocument<T>(collectionId, [
      {field: 'documentId', operator: DBFilterOperator.equals, value: data.documentId},
    ]);
    console.log(exists);
    if (!exists) return await this.db.addDocument(collectionId, data);
    else return exists?.id as string;
  }

  async deleteDocument(collectionId: string, documentId: string): Promise<boolean> {
    return await this.db.deleteDocument(collectionId, documentId);
  }
}
