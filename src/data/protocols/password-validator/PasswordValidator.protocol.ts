import { PasswordValidatorResponseType } from './types/PasswordValidatorResponse.type';

export interface IPasswordValidatorProtocol {
  validate(password: string): PasswordValidatorResponseType
}
