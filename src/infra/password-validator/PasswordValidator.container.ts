import MainContainer from '@data/di/MainContainer';
import { IPasswordValidatorProtocol } from '@data/protocols/password-validator/PasswordValidator.protocol';
import { container } from 'tsyringe';
import OwaspPasswordStrengthTest from './OwaspPasswordStrengthTest.adapter';

export default class PasswordValidatorContainer extends MainContainer {
  static inject(): void {
    container.register<IPasswordValidatorProtocol>(
      'PasswordValidator',
      {
        useClass: OwaspPasswordStrengthTest,
      },
    )
  }
}
