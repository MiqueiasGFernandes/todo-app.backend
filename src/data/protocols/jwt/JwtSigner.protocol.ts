import Token from '@domain/models/Token.model';
import User from '@domain/models/User.model';

export interface IJwtSignerProtocol {
  sign(user: User, privateKey: string): Promise<string>
  decode(token: string, publicKey: string): Promise<Token>
}
