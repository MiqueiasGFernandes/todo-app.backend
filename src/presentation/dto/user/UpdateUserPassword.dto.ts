export default class UpdateUserPasswordDto {
  constructor(data: UpdateUserPasswordDto) {
    Object.assign(this, data)
  }

  oldPassword: string

  newPassword: string

  newPasswordConfirmation: string
}
