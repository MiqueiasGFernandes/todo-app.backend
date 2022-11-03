export default class ResponseUserDto {
  constructor(data: ResponseUserDto) {
    Object.assign(this, data);
  }

  id: string

  name: string;

  email: string;

  active: boolean
}
