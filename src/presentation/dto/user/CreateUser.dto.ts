import MaxLength from '@data/protocols/input-validation/decorators/MaxLength.decorator';
import Required from '@data/protocols/input-validation/decorators/Required.decorator';
import IsString from '@data/protocols/input-validation/decorators/IsString.decorator';
import MinLength from '@data/protocols/input-validation/decorators/MinLength.decorator';
import IsEmail from '@data/protocols/input-validation/decorators/IsEmail.decorator';

export default class CreateUserDto {
  constructor(data: CreateUserDto) {
    Object.assign(this, data);
  }

  @Required()
  @IsString()
  @MaxLength(255)
    name: string;

  @Required()
  @IsString()
  @MinLength(6)
    password: string;

  @Required()
  @IsString()
    passwordConfirmation: string

  @Required()
  @IsEmail()
  @MaxLength(255)
    email: string;
}
