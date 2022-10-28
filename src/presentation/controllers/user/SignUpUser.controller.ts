import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';
import CreateUserDto from '@presentation/dto/user/CreateUser.dto';
import ResponseCreateUserDto from '@presentation/dto/user/ResponseCreateUser.dto';
import InputValidationException from '@domain/exceptions/InputValidation.exception';
import { IValidatorProtocol } from '@data/protocols/validator/Validator.protocol';

@injectable()
export default class SignUpController {
  private readonly addUser: IAddUserUseCase

  private readonly validator: IValidatorProtocol

  constructor(
    @inject('AddUser') addUser: IAddUserUseCase,
    @inject('Validator') validator: IValidatorProtocol,
  ) {
    this.addUser = addUser;
    this.validator = validator
  }

  async signUp(request: Request, response: Response): Promise<Response> {
    try {
      const inputDto: CreateUserDto = new CreateUserDto({
        email: request.body.email,
        name: request.body.name,
        password: request.body.password,
        passwordConfirmation: request.body.passwordConfirmation,
      })

      await this.validator.validate(inputDto).catch((errors: string[]) => {
        throw new InputValidationException(`Input validation errors: ${errors.join(', ')}`)
      })

      const data = await this.addUser.add({
        email: inputDto.email,
        name: inputDto.name,
        password: inputDto.password,
        passwordConfirmation: inputDto.passwordConfirmation,
        active: false,
      })

      const outputDto: ResponseCreateUserDto = new ResponseCreateUserDto({
        id: data.id as string,
        active: data.active,
        email: data.email,
        name: data.name,
      })

      return response.json(outputDto)
    } catch (error) {
      console.error(error);

      return response.status(500).json({
        errorName: (<Error>error).name,
        message: (<Error>error).message,
      })
    }
  }
}
