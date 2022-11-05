import * as express from 'express';
import { Router } from 'express';
import { container } from 'tsyringe';
import InactiveUserController from './InactiveUser.controller';
import SignUpController from './SignUpUser.controller';
import SignInUserController from './SingInUser.controller';
import SignOutController from './SignOutUser.controller';
import UserInformationController from './UserInformation.controller';

export default class UserRoutes {
  static register(): Router {
    const router: Router = express.Router();

    const signUpUserController: SignUpController = container.resolve<SignUpController>('SignUpController');
    const singInUserController: SignInUserController = container.resolve<SignInUserController>('SignInController')
    const userInformationController: UserInformationController = container.resolve<UserInformationController>('UserInformationController')
    const inactiveUserController: InactiveUserController = container.resolve<InactiveUserController>('InactiveUserController')
    const signOutUserController: SignOutController = container.resolve<SignOutController>('SignOutUserController')

    router.post('/auth/signup', signUpUserController.signUp.bind(signUpUserController))
    router.post('/auth/signin', singInUserController.signIn.bind(singInUserController))
    router.get('/auth/me', userInformationController.me.bind(userInformationController))
    router.delete('/auth/signout', signOutUserController.signOut.bind(signOutUserController))

    router.delete('/users/:id', inactiveUserController.inactive.bind(inactiveUserController))

    return router
  }
}
