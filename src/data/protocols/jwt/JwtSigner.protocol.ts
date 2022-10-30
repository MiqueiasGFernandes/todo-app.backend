import User from '@domain/models/User.model';

export interface IJwtSignerProtocol {
  sign(user: User, privateKey: string): Promise<string>
}
