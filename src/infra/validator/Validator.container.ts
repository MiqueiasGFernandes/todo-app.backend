import MainContainer from '@data/di/MainContainer';
import { IValidatorProtocol } from '@data/protocols/validator/Validator.protocol';
import { container } from 'tsyringe';
import ClassValidatorAdapter from './ClassValidator.adapter';

export default class UserContainer extends MainContainer {
  static inject(): void {
    container
      .register<IValidatorProtocol>('Validator', {
        useClass: ClassValidatorAdapter,
      })
  }
}
