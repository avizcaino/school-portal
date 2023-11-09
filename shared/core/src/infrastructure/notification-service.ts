import {provideSingleton} from '@uxland/ioc';
import {NotificationService} from '@uxland/react-services';
import {injectable} from 'inversify';
import {ToastOptions} from 'react-toastify';

@injectable()
@provideSingleton(NotificationService)
export class NotificationServiceImplementation
  extends NotificationService
  implements NotificationService
{
  notify(message: string, options?: ToastOptions<Record<string, never>>): void {
    super.notify(message, options);
  }
  notifyInfo(message: string, options?: ToastOptions<Record<string, never>>): void {
    super.notifyInfo(message, options);
  }
  notifySuccess(message: string, options?: ToastOptions<Record<string, never>>): void {
    super.notifySuccess(message, options);
  }
  notifyWarning(message: string, options?: ToastOptions<Record<string, never>>): void {
    super.notifyWarning(message, options);
  }
  notifyError(message: string, options?: ToastOptions<Record<string, never>>): void {
    super.notifyError(message, options);
  }
}
