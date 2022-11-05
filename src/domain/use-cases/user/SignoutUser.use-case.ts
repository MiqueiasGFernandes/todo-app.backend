export interface ISignoutUserUseCase {
  signOut(tokenValue: string): Promise<void>
}
