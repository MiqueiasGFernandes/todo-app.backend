import * as express from 'express';
import { Router } from 'express'
import { container } from 'tsyringe';
import SignUpController from './SignUpUser.controller';

export default class UserRoutes {
  private static router: Router = express.Router();

  static register(): Router {
    const signUpUserController: SignUpController = container.resolve<SignUpController>('SignUpController');

    UserRoutes.router.post('/auth/signup', signUpUserController.signUp.bind(signUpUserController))

    return UserRoutes.router
  }
}
