import {inject, injectable} from 'inversify';
import {BackendAdapter} from '../domain/backend-adapter';
import {FirebaseDB} from '../domain/db';
import {provideTransient} from '../ioc';
import {getCollectionConverter} from '../mappers/collection-converter';

@injectable()
@provideTransient(BackendAdapter)
export class BackendAdapterImpl implements BackendAdapter {
  constructor(@inject(FirebaseDB) protected db: FirebaseDB) {}

  async getAll<T>(collectionId: string): Promise<T[]> {
    return this.db.getCollection<T>(collectionId, getCollectionConverter<T>());
  }
}
