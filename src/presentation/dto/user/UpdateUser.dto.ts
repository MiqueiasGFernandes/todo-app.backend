import MessagesConstant from '@infra/validator/constants/Messages.constant';
import { IsString, MaxLength } from 'class-validator';

export default class UpdateUserDto {
  constructor(data: UpdateUserDto) {
    Object.assign(this, data);
  }

  @IsString({ message: MessagesConstant.IS_STRING })
  @MaxLength(500, {
    message: MessagesConstant.MAX_LENGTH,
  })
    name?: string | null;
}
