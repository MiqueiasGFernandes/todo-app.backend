export default class ResponseCreateUserDto {
  constructor(data: ResponseCreateUserDto) {
    Object.assign(this, data);
  }

  id: string

  name: string;

  email: string;

  active: boolean
}
