import Token from '@domain/models/Token.model';

export interface ILoginUserUseCase {
  login(username: string, password: string): Promise<Token>
}
