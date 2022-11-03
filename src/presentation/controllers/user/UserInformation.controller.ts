import InputValidationException from '@domain/exceptions/InputValidation.exception';
import User from '@domain/models/User.model';
import { IGetCurrentUserInformationUseCase } from '@domain/use-cases/user/GetCurrentUserInformation.use-case';
import ResponseUserDto from '@presentation/dto/user/ResponseUser.dto';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UserInformationController {
  private readonly remoteUserInformationUseCase: IGetCurrentUserInformationUseCase

  constructor(
  @inject('GetCurrentUserInformation') remoteUserInformationUseCase: IGetCurrentUserInformationUseCase,
  ) {
    this.remoteUserInformationUseCase = remoteUserInformationUseCase
  }

  async me(request: Request, response: Response): Promise<Response> {
    try {
      const tokenHeader: string | undefined = request.header('authorization')?.split(' ')[1]

      if (!tokenHeader) {
        throw new InputValidationException('Input validation error: Authorization header is required')
      }

      const data: User = await this.remoteUserInformationUseCase.me(
        request.header('authorization')?.split(' ')[1] as string,
      )

      const outputDto: ResponseUserDto = new ResponseUserDto({
        id: data.id as string,
        name: data.name,
        email: data.email,
        active: data.active,
      })

      return response.json(outputDto)
    } catch (error) {
      console.error(error);

      return response
        .status(500)
        .json({
          errorName: (error as Error).name,
          message: (error as Error).message,
        })
    }
  }
}
