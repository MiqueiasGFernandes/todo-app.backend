import { IEncryptatorProtocol } from '@data/protocols/encryptator/Encryptator.protocol';
import { IPasswordValidatorProtocol } from '@data/protocols/password-validator/PasswordValidator.protocol';
import IUserRepository from '@data/repositories/User.repository';
import IncorrectPasswordException from '@domain/exceptions/IncorrectPassword.exception';
import PasswordsDoNotMatchException from '@domain/exceptions/PasswordsDoNotMatch.exception';
import StronglessPasswordException from '@domain/exceptions/StronglessPassword.exception';
import { IChangeUserPasswordUseCase } from '@domain/use-cases/user/ChangeUserPassword.use-case';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class RemotePasswordChanger implements IChangeUserPasswordUseCase {
  private readonly passwordValidator: IPasswordValidatorProtocol

  private readonly userRepository: IUserRepository

  private encryptator: IEncryptatorProtocol

  constructor(
  @inject('PasswordValidator') passwordValidator: IPasswordValidatorProtocol,
    @inject('UserRepository') userRepository: IUserRepository,
    @inject('EncryptatorProtocol') encryptator: IEncryptatorProtocol,
  ) {
    this.passwordValidator = passwordValidator
    this.userRepository = userRepository
    this.encryptator = encryptator
  }

  async update(
    id: string,
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmation: string,
  ): Promise<void> {
    if (newPassword !== newPasswordConfirmation) {
      throw new PasswordsDoNotMatchException('Password and password confirmation do not match')
    }

    const { isValid, errors } = this.passwordValidator.validate(newPassword)

    if (!isValid) {
      throw new StronglessPasswordException(`Your password is strongless, follow the password security patterns and try again: ${errors.join('; ')}`)
    }

    const encryptedOldPassword: string = await this.encryptator.crypt(oldPassword)

    await this
      .userRepository
      .findByIdAndPasswordOrFail(id, encryptedOldPassword)
      .catch(() => {
        throw new IncorrectPasswordException('Password is incorrect')
      })

    const encryptedPassword: string = await this.encryptator.crypt(newPassword)

    await this.userRepository.update(id, {
      password: encryptedPassword,
    })
  }
}
