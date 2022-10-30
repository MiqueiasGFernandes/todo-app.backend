import { IJwtSignerProtocol } from '@data/protocols/jwt/JwtSigner.protocol';
import UserModel from '@domain/models/User.model';
import { injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

@injectable()
export default class JwtAdapter implements IJwtSignerProtocol {
  sign(user: UserModel, privateKey: string): Promise<string> {
    const jwt: string = sign({ sub: user.id }, privateKey, {
      expiresIn: '7days',
    })

    return Promise.resolve(jwt)
  }
}
