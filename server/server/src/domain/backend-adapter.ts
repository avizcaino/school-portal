export abstract class BackendAdapter {
  abstract getAll<T>(collectionId: string): Promise<T[]>;
}
