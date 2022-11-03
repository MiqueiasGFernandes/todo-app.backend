import { IJwtSignerProtocol } from '@data/protocols/jwt/JwtSigner.protocol';
import UserModel from '@domain/models/User.model';
import { injectable } from 'tsyringe';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import Token from '@domain/models/Token.model';

@injectable()
export default class JwtAdapter implements IJwtSignerProtocol {
  decode(token: string, publicKey: string): Promise<Token> {
    try {
      const jwt: JwtPayload = verify(token, publicKey, {
        algorithms: ['RS512'],
      }) as JwtPayload

      const tokenModel: Token = new Token()

      tokenModel.subject = jwt.sub as string

      return Promise.resolve(tokenModel)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  sign(user: UserModel, privateKey: string): Promise<string> {
    const jwt: string = sign({ sub: user.id }, privateKey, {
      expiresIn: '7days',
      algorithm: 'RS512',
    })

    return Promise.resolve(jwt)
  }
}
