import IConfigProtocol from '@data/protocols/config/Config.protocol';
import { IJwtSignerProtocol } from '@data/protocols/jwt/JwtSigner.protocol';
import { ITokenRepository } from '@data/repositories/Token.repository';
import ResourceNotFoundException from '@domain/exceptions/ResourceNotFound.exception';
import Token from '@domain/models/Token.model';
import { ISignoutUserUseCase } from '@domain/use-cases/user/SignoutUser.use-case';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class RemoteUserSignOut implements ISignoutUserUseCase {
  private readonly tokenRepository: ITokenRepository

  private readonly jwtSigner: IJwtSignerProtocol

  private readonly configProtocol: IConfigProtocol

  constructor(
  @inject('TokenRepository') tokenRepository: ITokenRepository,
    @inject('JwtSigner') jwtSigner: IJwtSignerProtocol,
    @inject('ConfigProtocol') configProtocol: IConfigProtocol,
  ) {
    this.tokenRepository = tokenRepository
    this.jwtSigner = jwtSigner
    this.configProtocol = configProtocol
  }

  async signOut(tokenValue: string): Promise<void> {
    const publicKey: string = await this.configProtocol.getString('PUBLIC_KEY')

    const { subject } = await this.jwtSigner.decode(tokenValue, publicKey)

    const token: Token = await this.tokenRepository.findOneByOrFail({
      subjectId: subject as string,
    }).catch(() => {
      throw new ResourceNotFoundException('Token', { subject: subject as string })
    })

    await this.tokenRepository.delete(
      token.subject as string,
    )
  }
}
