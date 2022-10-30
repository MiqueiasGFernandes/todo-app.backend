import IConfigProtocol from '@data/protocols/config/Config.protocol';
import { IEncryptatorProtocol } from '@data/protocols/encryptator/Encryptator.protocol';
import { IIdGeneratorProtocol } from '@data/protocols/id-generator/IdGenerator.protocol';
import { IJwtSignerProtocol } from '@data/protocols/jwt/JwtSigner.protocol';
import { ITokenRepository } from '@data/repositories/Token.repository';
import IUserRepository from '@data/repositories/User.repository';
import InvalidLoginCredentials from '@domain/exceptions/InvalidLoginCredentials.exception';
import Token from '@domain/models/Token.model';
import User from '@domain/models/User.model';
import { ILoginUserUseCase } from '@domain/use-cases/user/LoginUser.use-case';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class RemoteLoginUser implements ILoginUserUseCase {
  private readonly userRepository: IUserRepository

  private readonly tokenRepository: ITokenRepository

  private readonly encryptator: IEncryptatorProtocol

  private readonly jwtSigner: IJwtSignerProtocol

  private readonly config: IConfigProtocol

  private readonly idGenerator: IIdGeneratorProtocol

  constructor(
    @inject('UserRepository') userRepository: IUserRepository,
    @inject('TokenRepository') tokenRepository: ITokenRepository,
    @inject('JwtSigner') jwtSigner: IJwtSignerProtocol,
    @inject('IdGeneratorProtocol') idGenerator: IIdGeneratorProtocol,
    @inject('EncryptatorProtocol') ecryptator: IEncryptatorProtocol,
    @inject('ConfigProtocol') config: IConfigProtocol,
  ) {
    this.userRepository = userRepository
    this.encryptator = ecryptator
    this.tokenRepository = tokenRepository
    this.jwtSigner = jwtSigner
    this.config = config
    this.idGenerator = idGenerator
  }

  async login(email: string, password: string): Promise<Token> {
    const encryptatedPassword: string = await this.encryptator.crypt(password)

    const user: User | undefined = await this.userRepository.findByEmailAndPassword(
      email,
      encryptatedPassword,
    )

    if (!user) {
      throw new InvalidLoginCredentials('Email or password it\'s incorrect. Check your login data or confirm your User by received email code')
    }

    const privateKey: string = this.config.getString('PRIVATE_KEY') as string

    const jwtValue: string = await this.jwtSigner.sign(user, privateKey)

    const jwtId: string = await this.idGenerator.generate()

    const token: Token = await this.tokenRepository.add({
      id: jwtId,
      value: jwtValue,
      expired: false,
      userId: user.id as string,
    })

    return token
  }
}
