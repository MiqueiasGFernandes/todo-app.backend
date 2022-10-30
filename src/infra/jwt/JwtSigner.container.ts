import MainContainer from '@data/di/MainContainer';
import { IJwtSignerProtocol } from '@data/protocols/jwt/JwtSigner.protocol';
import { container } from 'tsyringe';
import JwtAdapter from './Jwt.adapter';

export default class JwtSignerContainer extends MainContainer {
  static inject(): void {
    container
      .register<IJwtSignerProtocol>('JwtSigner', {
        useClass: JwtAdapter,
      })
  }
}
