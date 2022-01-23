export interface IChangeUserPasswordUseCase {
  update(id: string, oldPassword: string, newPassword: string): Promise<string>
}
