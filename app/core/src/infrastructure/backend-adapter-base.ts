import {provideSingleton} from '@uxland/ioc';
import {injectable} from 'inversify';
import {create, MethodName} from 'middleware-axios';

const httpClientSingleton = create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {},
}).axiosInstance;

@injectable()
@provideSingleton()
export class BackendAdapterBase {
  fetch<T>(url: string, method: MethodName, payload?: unknown): Promise<T> {
    return httpClientSingleton[method]<unknown, T>(url, payload);
  }
}
