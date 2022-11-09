export interface IChangeUserPasswordUseCase {
  update(
    id: string,
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
  ): Promise<void>
}
