import { IPasswordValidatorProtocol } from '@data/protocols/password-validator/PasswordValidator.protocol';
import { PasswordValidatorResponseType } from '@data/protocols/password-validator/types/PasswordValidatorResponse.type';
import owasp from 'owasp-password-strength-test';
import { injectable } from 'tsyringe';

@injectable()
export default class OwaspPasswordStrengthTest implements IPasswordValidatorProtocol {
  validate(password: string): PasswordValidatorResponseType {
    const { errors } = owasp.test(password)
    const isValid: boolean = errors.length === 0

    return {
      errors,
      isValid,
    }
  }
}
