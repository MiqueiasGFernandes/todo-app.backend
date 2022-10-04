import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';
import CreateUserDto from '@presentation/dto/user/CreateUser.dto';

@injectable()
export default class SignUpController {
  private readonly addUser: IAddUserUseCase

  constructor(addUser: IAddUserUseCase) {
    this.addUser = addUser;
  }

  async signUp(request: Request, response: Response): Promise<Response> {
    try {
      const dto = new CreateUserDto({
        email: request.body.email,
        name: request.body.name,
        password: request.body.password,
        passwordConfirmation: request.body.passwordConfirmation,
      })

      const data = await this.addUser.add({
        email: dto.email,
        name: dto.name,
        password: dto.password,
        passwordConfirmation: dto.passwordConfirmation,
        active: false,
      })

      return response.json(data)
    } catch (error) {
      return response.status(500).json({
        errorName: (<Error>error).name,
        message: (<Error>error).message,
      })
    }
  }
}
