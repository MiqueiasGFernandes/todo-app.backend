import { IValidatorProtocol } from '@data/protocols/validator/Validator.protocol';
import InputValidationException from '@domain/exceptions/InputValidation.exception';
import Token from '@domain/models/Token.model';
import { ILoginUserUseCase } from '@domain/use-cases/user/LoginUser.use-case';
import LoginInputDto from '@presentation/dto/auth/LoginInput.dto';
import { Response, Request } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class SignInController {
  private readonly logInUserUseCase: ILoginUserUseCase

  private readonly validator: IValidatorProtocol

  constructor(
    @inject('LoginUser') logInUserUseCase: ILoginUserUseCase,
    @inject('Validator') validator: IValidatorProtocol,
  ) {
    this.logInUserUseCase = logInUserUseCase
    this.validator = validator
  }

  async signIn(request: Request, response: Response): Promise<Response> {
    try {
      const inputDto = new LoginInputDto({
        email: request.body.email,
        password: request.body.password,
      })

      await this.validator
        .validate(inputDto)
        .catch((errors: string[]) => {
          throw new InputValidationException(`Input validation errors: ${errors.join(', ')}`)
        })

      const token: Token = await this.logInUserUseCase.login(
        request.body.email as string,
        request.body.password as string,
      )

      return response.json({
        token,
      })
    } catch (error: unknown) {
      return response
        .status(500)
        .json({
          errorName: (error as Error).name,
          message: (error as Error).message,
        })
    }
  }
}
