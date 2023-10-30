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
  async fetch<T>(url: string, method: MethodName, payload?: unknown): Promise<T> {
    const response: any = await httpClientSingleton[method]<unknown, T>(url, payload);
    if (response.status === 200) return response.data;
    else throw new Error(response.statusText);
  }
}
