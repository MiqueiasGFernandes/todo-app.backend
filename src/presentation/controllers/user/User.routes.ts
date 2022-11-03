import * as express from 'express';
import { Router } from 'express'
import { container } from 'tsyringe';
import SignUpController from './SignUpUser.controller';
import SignInUserController from './SingInUser.controller';
import UserInformationController from './UserInformation.controller';

export default class UserRoutes {
  static register(): Router {
    const router: Router = express.Router();

    const signUpUserController: SignUpController = container.resolve<SignUpController>('SignUpController');
    const singInUserController: SignInUserController = container.resolve<SignInUserController>('SignInController')
    const userInformationController: UserInformationController = container.resolve<UserInformationController>('UserInformationController')

    router.post('/auth/signup', signUpUserController.signUp.bind(signUpUserController))
    router.post('/auth/signin', singInUserController.signIn.bind(singInUserController))
    router.get('/auth/me', userInformationController.me.bind(userInformationController))

    return router
  }
}
