export interface IInactiveUserUseCase {
  inactive(id: string): Promise<void>
}
