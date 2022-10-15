import * as express from 'express';
import { Router } from 'express'
import { container } from 'tsyringe';
import SignUpController from './SignUpUser.controller';

export default class UserRoutes {
  static register(): Router {
    const router: Router = express.Router();

    const signUpUserController: SignUpController = container.resolve<SignUpController>('SignUpController');

    router.post('/auth/signup', signUpUserController.signUp.bind(signUpUserController))

    return router
  }
}
