export interface IDeleteListUseCase {
  delete(id: string): Promise<string>
}
