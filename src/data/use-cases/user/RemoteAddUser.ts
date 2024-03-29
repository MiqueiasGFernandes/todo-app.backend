import { IEncryptatorProtocol } from '@data/protocols/encryptator/Encryptator.protocol';
import { IIdGeneratorProtocol } from '@data/protocols/id-generator/IdGenerator.protocol';
import { IPasswordValidatorProtocol } from '@data/protocols/password-validator/PasswordValidator.protocol';
import IUserRepository from '@data/repositories/User.repository';
import PasswordsDoNotMatchException from '@domain/exceptions/PasswordsDoNotMatch.exception';
import StronglessPasswordException from '@domain/exceptions/StronglessPassword.exception';
import UserAlreadyExistsException from '@domain/exceptions/UserAlreadyExists.exception';
import User from '@domain/models/User.model';
import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class RemoteAddUser implements IAddUserUseCase {
  private readonly userRepository: IUserRepository;

  private readonly passwordValidator: IPasswordValidatorProtocol

  private readonly encryptator: IEncryptatorProtocol

  private readonly idGenerator: IIdGeneratorProtocol

  constructor(
    @inject('UserRepository') userRepository: IUserRepository,
    @inject('PasswordValidator') passwordValidator: IPasswordValidatorProtocol,
    @inject('EncryptatorProtocol') encryptator: IEncryptatorProtocol,
    @inject('IdGeneratorProtocol') idGenerator: IIdGeneratorProtocol,
  ) {
    this.userRepository = userRepository;
    this.passwordValidator = passwordValidator;
    this.encryptator = encryptator;
    this.idGenerator = idGenerator;
  }

  async add(user: User): Promise<User> {
    if (user.password !== user.passwordConfirmation) {
      throw new PasswordsDoNotMatchException('Password and password confirmation do not match')
    }

    const { isValid, errors } = this.passwordValidator.validate(user.password)

    if (!isValid) {
      throw new StronglessPasswordException(`Your password is strongless, follow the password security patterns and try again: ${errors.join('; ')}`)
    }

    const encryptedPassword: string = await this.encryptator.crypt(user.password)

    const userCount: number = await this.userRepository.countByEmail(user.email)
    const hasUser: boolean = userCount > 0

    if (hasUser) {
      throw new UserAlreadyExistsException(`An user with email: '${user.email}' already exists. Please, type a valid email and try again `)
    }

    const generatedId: string = await this.idGenerator.generate()

    return this.userRepository.add({
      ...user,
      id: generatedId,
      password: encryptedPassword,
    });
  }
}
