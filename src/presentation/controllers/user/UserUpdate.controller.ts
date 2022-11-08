import { IValidatorProtocol } from '@data/protocols/validator/Validator.protocol';
import InputValidationException from '@domain/exceptions/InputValidation.exception';
import { IUpdateUserUseCase } from '@domain/use-cases/user/UpdateUser.use-case';
import UpdateUserDto from '@presentation/dto/user/UpdateUser.dto';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UserUpdateController {
  private readonly updateUser: IUpdateUserUseCase

  private readonly validator: IValidatorProtocol

  constructor(
  @inject('UpdateUser') updateUser: IUpdateUserUseCase,
    @inject('Validator') validator: IValidatorProtocol,
  ) {
    this.updateUser = updateUser;
    this.validator = validator
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const inputDto: UpdateUserDto = new UpdateUserDto({ ...request.body } as UpdateUserDto)

      await this.validator.validate(inputDto).catch((errors: string[]) => {
        throw new InputValidationException(`Input validation errors: ${errors.join(', ')}`)
      })

      await this.updateUser.update({
        id: request.params.id,
        ...inputDto,
      })

      return response
        .sendStatus(204)
    } catch (error) {
      console.error(error);

      return response.status(500).json({
        errorName: (<Error>error).name,
        message: (<Error>error).message,
      })
    }
  }
}
