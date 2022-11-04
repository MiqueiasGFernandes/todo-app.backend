import { IInactiveUserUseCase } from '@domain/use-cases/user/InactiveUser.use-case';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class InactiveUserController {
  private readonly inactiveUser: IInactiveUserUseCase

  constructor(
  @inject('InactiveUser') inactiveUser: IInactiveUserUseCase,
  ) {
    this.inactiveUser = inactiveUser
  }

  async inactive(request: Request, response: Response): Promise<Response> {
    try {
      await this.inactiveUser.inactive(
        request.params.id,
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
