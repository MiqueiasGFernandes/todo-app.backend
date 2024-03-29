import MainContainer from '@data/di/MainContainer';
import { container } from 'tsyringe';
import InactiveUserController from './user/InactiveUser.controller';
import SignOutUserController from './user/SignOutUser.controller';
import SignUpController from './user/SignUpUser.controller';
import SignInUserController from './user/SingInUser.controller';
import UserInformationController from './user/UserInformation.controller';
import UserPasswordChangerController from './user/UserPasswordChanger.controller';
import UserUpdateController from './user/UserUpdate.controller';

export default class UserControllerContainer extends MainContainer {
  static inject(): void {
    container
      .register('SignUpController', {
        useClass: SignUpController,
      })
      .register('SignInController', {
        useClass: SignInUserController,
      })
      .register('UserInformationController', {
        useClass: UserInformationController,
      })
      .register('InactiveUserController', {
        useClass: InactiveUserController,
      })
      .register('SignOutUserController', {
        useClass: SignOutUserController,
      })
      .register('UserUpdateController', {
        useClass: UserUpdateController,
      })
      .register('UserPasswordChangerController', {
        useClass: UserPasswordChangerController,
      })
  }
}
