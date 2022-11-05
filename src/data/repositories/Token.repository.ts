import Token from '@domain/models/Token.model';

export interface ITokenRepository {
  add(token: Token): Promise<Token>
  findOneByOrFail(params: {subjectId: string}): Promise<Token>
  delete(id: string): Promise<void>
}
