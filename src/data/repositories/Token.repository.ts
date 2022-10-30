import Token from '@domain/models/Token.model';

export interface ITokenRepository {
  add(token: Token): Promise<Token>
}
