import MainContainer from '@data/di/MainContainer';
import { container } from 'tsyringe';
import SignUpController from './user/SignUpUser.controller';
import SignInUserController from './user/SingInUser.controller';

export default class UserControllerContainer extends MainContainer {
  static inject(): void {
    container
      .register('SignUpController', {
        useClass: SignUpController,
      })
      .register('SignInController', {
        useClass: SignInUserController,
      })
  }
}
