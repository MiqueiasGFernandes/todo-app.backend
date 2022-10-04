import MainContainer from '@data/di/MainContainer';
import { container } from 'tsyringe';
import HttpApplication from './HttpApplication';

export default class HttpApplicationContainer extends MainContainer {
  static inject(): void {
    container.register('HttpApplication', {
      useClass: HttpApplication,
    })
  }
}
