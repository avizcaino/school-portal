import {Container, interfaces} from 'inversify';
import {fluentProvide} from 'inversify-binding-decorators';

const iocContainer = new Container();

export const provideSingleton = (identifier: interfaces.Newable<any>) => {
  const res = fluentProvide(identifier).inSingletonScope().done();
  iocContainer.bind(identifier).to(identifier).inSingletonScope();
  return res;
};

export function provideTransient<T>(identifier?: interfaces.ServiceIdentifier<T>) {
  return function (constructor: any): void {
    identifier = identifier || constructor;
    iocContainer
      .bind(identifier as interfaces.ServiceIdentifier<T>)
      .to(constructor)
      .inTransientScope();
  };
}

export {iocContainer};
