import MainContainer from '@data/di/MainContainer';
import { container } from 'tsyringe';
import EnvConfigAdapter from './EnvConfig.adapter';

export default class ConfigContainer extends MainContainer {
  static inject(): void {
    container.register('ConfigProtocol', {
      useClass: EnvConfigAdapter,
    })
  }
}
