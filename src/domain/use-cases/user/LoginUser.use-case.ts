import Token from '@domain/models/Token.model';

export interface ILoginUserUseCase {
  login(email: string, password: string): Promise<Token>
}
