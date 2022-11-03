import IConfigProtocol from '@data/protocols/config/Config.protocol';
import { IJwtSignerProtocol } from '@data/protocols/jwt/JwtSigner.protocol';
import { ITokenRepository } from '@data/repositories/Token.repository';
import IUserRepository from '@data/repositories/User.repository';
import InvalidTokenSignatureException from '@domain/exceptions/InvalidTokenSignature.exception';
import SessionExpiredException from '@domain/exceptions/SessionExpired.exception';
import UnauthorizedException from '@domain/exceptions/Unauthorized.exception';
import Token from '@domain/models/Token.model';
import UserModel from '@domain/models/User.model';
import { IGetCurrentUserInformationUseCase } from '@domain/use-cases/user/GetCurrentUserInformation.use-case';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class RemoteUserInformation implements IGetCurrentUserInformationUseCase {
  private readonly jwtSigner: IJwtSignerProtocol

  private readonly tokenRepository: ITokenRepository

  private readonly userRepository: IUserRepository

  private readonly config: IConfigProtocol

  constructor(
  @inject('UserRepository') userRepository: IUserRepository,
    @inject('TokenRepository')tokenRepository: ITokenRepository,
    @inject('JwtSigner') jwtSigner: IJwtSignerProtocol,
    @inject('ConfigProtocol') config: IConfigProtocol,
  ) {
    this.userRepository = userRepository
    this.tokenRepository = tokenRepository
    this.jwtSigner = jwtSigner
    this.config = config
  }

  async me(tokenValue: string): Promise<UserModel> {
    const tokenDecodePublicKey: string = this.config.getString('PUBLIC_KEY') as string

    const { subject: subjectId } = await this
      .jwtSigner
      .decode(tokenValue, tokenDecodePublicKey)
      .catch((error) => {
        switch (error.name) {
          case 'TokenExpiredError':
            throw new SessionExpiredException('Session had expired. Try to sign in again')
          default:
            throw new InvalidTokenSignatureException('The token signature is invalid. Try to sign in again')
        }
      })

    const token: Token = await this
      .tokenRepository
      .findOneByOrFail({ subjectId: subjectId as string })
      .catch(() => {
        throw new UnauthorizedException('Invalid credentials and not authorized to perfom this action')
      })

    const user: UserModel = await this
      .userRepository
      .findOneOrFail(token.subject as string)
      .catch(() => {
        throw new UnauthorizedException('Invalid credentials and not authorized to perfom this action')
      })

    return user
  }
}
