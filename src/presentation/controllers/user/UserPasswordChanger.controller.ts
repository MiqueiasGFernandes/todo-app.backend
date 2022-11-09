import { IValidatorProtocol } from '@data/protocols/validator/Validator.protocol';
import InputValidationException from '@domain/exceptions/InputValidation.exception';
import { IChangeUserPasswordUseCase } from '@domain/use-cases/user/ChangeUserPassword.use-case';
import UpdateUserPasswordDto from '@presentation/dto/user/UpdateUserPassword.dto';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UserPasswordChangerController {
  private readonly userPasswordChanger: IChangeUserPasswordUseCase

  private readonly validator: IValidatorProtocol

  constructor(
  @inject('ChangeUserPassword') userPasswordChanger: IChangeUserPasswordUseCase,
    @inject('Validator') validator: IValidatorProtocol,
  ) {
    this.userPasswordChanger = userPasswordChanger
    this.validator = validator
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const inputDto: UpdateUserPasswordDto = new UpdateUserPasswordDto({
        oldPassword: request.body.oldPassword,
        newPasswordConfirmation: request.body.newPasswordConfirmation,
        newPassword: request.body.newPassword,
      })

      await this.validator
        .validate(inputDto)
        .catch((errors: string[]) => {
          throw new InputValidationException(`Input validation errors: ${errors.join(', ')}`)
        })

      await this.userPasswordChanger.update(
        request.params.id,
        inputDto.oldPassword,
        inputDto.newPassword,
        inputDto.newPasswordConfirmation,
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
