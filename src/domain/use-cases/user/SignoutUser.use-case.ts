import Token from '@domain/models/Token.model';

export interface ISignoutUserUseCase {
  signOut(token: Token): void
}
