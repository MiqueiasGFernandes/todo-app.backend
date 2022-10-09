import MainContainer from '@data/di/MainContainer';
import { IEncryptatorProtocol } from '@data/protocols/encryptator/Encryptator.protocol';
import { container } from 'tsyringe';
import CryptoEncryptatorAdapter from './CryptoEncryptator.adapter';

export default class EncryptatorContainer extends MainContainer {
  static inject(): void {
    container.register<IEncryptatorProtocol>('EncryptatorProtocol', {
      useClass: CryptoEncryptatorAdapter,
    })
  }
}
