import * as express from 'express';
import { Router } from 'express'
import { container } from 'tsyringe';
import SignUpController from './SignUpUser.controller';
import SignInUserController from './SingInUser.controller';

export default class UserRoutes {
  static register(): Router {
    const router: Router = express.Router();

    const signUpUserController: SignUpController = container.resolve<SignUpController>('SignUpController');
    const singInUserController: SignInUserController = container.resolve<SignInUserController>('SignInController')

    router.post('/auth/signup', signUpUserController.signUp.bind(signUpUserController))
    router.post('/auth/signin', singInUserController.signIn.bind(singInUserController))

    return router
  }
}
