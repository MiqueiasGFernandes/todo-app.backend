import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';
import Body from '@infra/http/express/decorators/Body.decorator';
import Controller from '@infra/http/express/decorators/Controller.decorator';
import Post from '@infra/http/express/decorators/http-methods/Post.decorator';
import CreateUserDto from '@presentation/dto/user/CreateUser.dto';
import ResponseCreateUserDto from '@presentation/dto/user/ResponseUser.dto';

@Controller()
export default class UserController {
  private readonly addUser: IAddUserUseCase

  @Post('/auth/signup')
  async post(@Body() body: CreateUserDto): Promise<ResponseCreateUserDto> {
    const data = await this.addUser.add({
      email: body.email,
      name: body.name,
      password: body.password,
      passwordConfirmation: body.passwordConfirmation,
      active: false,
    })

    const outputDto: ResponseCreateUserDto = new ResponseCreateUserDto({
      id: data.id as string,
      active: data.active,
      email: data.email,
      name: data.name,
    })

    return outputDto
  }
}
