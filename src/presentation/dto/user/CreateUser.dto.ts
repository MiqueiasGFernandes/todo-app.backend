import MessagesConstant from '@infra/validator/constants/Messages.constant';
import {
  IsEmail, IsNotEmpty, IsString, MaxLength,
} from 'class-validator';

export default class CreateUserDto {
  constructor(data: CreateUserDto) {
    Object.assign(this, data);
  }

  @IsString({ message: MessagesConstant.IS_STRING })
  @MaxLength(500, {
    message: MessagesConstant.MAX_LENGTH,
  })
  @IsNotEmpty({ message: MessagesConstant.IS_REQUIRED })
    name: string;

  @IsString({ message: MessagesConstant.IS_STRING })
  @MaxLength(1000, {
    message: MessagesConstant.MAX_LENGTH,
  })
  @IsNotEmpty({ message: MessagesConstant.IS_REQUIRED })
    password: string;

  @IsString({ message: MessagesConstant.IS_STRING })
  @MaxLength(1000, {
    message: MessagesConstant.MAX_LENGTH,
  })
  @IsNotEmpty({ message: MessagesConstant.IS_REQUIRED })
    passwordConfirmation: string

  @IsEmail({ message: MessagesConstant.IS_EMAIL })
  @MaxLength(1000, {
    message: MessagesConstant.MAX_LENGTH,
  })
  @IsNotEmpty({ message: MessagesConstant.IS_REQUIRED })
    email: string;
}
