import MessagesConstant from '@infra/validator/constants/Messages.constant'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export default class LoginInputDto {
  constructor(data?: LoginInputDto) {
    Object.assign(this, data)
  }

  @IsEmail({ message: MessagesConstant.IS_EMAIL })
  @IsNotEmpty({ message: MessagesConstant.IS_REQUIRED })
    email: string

  @IsString({ message: MessagesConstant.IS_STRING })
  @IsNotEmpty({ message: MessagesConstant.IS_REQUIRED })
    password: string
}
