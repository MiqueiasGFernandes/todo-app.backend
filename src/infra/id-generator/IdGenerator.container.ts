import MainContainer from '@data/di/MainContainer';
import { container } from 'tsyringe';
import UuidGeneratorAdapter from './UuidGenerator.adapter';

export default class IdGeneratorContainer extends MainContainer {
  static inject(): void {
    container.register('IdGeneratorProtocol', {
      useClass: UuidGeneratorAdapter,
    })
  }
}
