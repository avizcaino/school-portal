import {injectable} from 'inversify';
import {BackendAdapter} from '../domain/backend-adapter';
import {provideTransient} from '../ioc';

@injectable()
@provideTransient(BackendAdapter)
export class BackendAdapterImpl implements BackendAdapter {}
