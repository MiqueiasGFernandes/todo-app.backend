import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';
import CreateUserDto from '@presentation/dto/user/CreateUser.dto';
import ResponseCreateUserDto from '@presentation/dto/user/ResponseCreateUser.dto';

@injectable()
export default class SignUpController {
  private readonly addUser: IAddUserUseCase

  constructor(@inject('AddUser') addUser: IAddUserUseCase) {
    this.addUser = addUser;
  }

  async signUp(request: Request, response: Response): Promise<Response> {
    try {
      const inputDto: CreateUserDto = new CreateUserDto({
        email: request.body.email,
        name: request.body.name,
        password: request.body.password,
        passwordConfirmation: request.body.passwordConfirmation,
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
