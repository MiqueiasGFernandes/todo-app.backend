import { ISignoutUserUseCase } from '@domain/use-cases/user/SignoutUser.use-case';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import InputValidationException from '@domain/exceptions/InputValidation.exception';

@injectable()
export default class SignOutUserController {
  private readonly signOutUser: ISignoutUserUseCase

  constructor(
  @inject('SignOutUser') signOutUser: ISignoutUserUseCase,
  ) {
    this.signOutUser = signOutUser
  }

  async signOut(request: Request, response: Response): Promise<Response> {
    try {
      const token: string | undefined = request.header('authorization')?.split(' ')[1]

      if (!token) {
        throw new InputValidationException('Input validation error: Authorization header is required')
      }

      await this.signOutUser.signOut(
        token,
      )

      return response.sendStatus(204)
    } catch (error) {
      console.error(error)

      return response.status(500).json({
        errorName: (error as Error).name,
        message: (error as Error).message,
      })
    }
  }
}
