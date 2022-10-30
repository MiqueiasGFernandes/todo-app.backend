import { ITokenRepository } from '@data/repositories/Token.repository';
import TokenModel from '@domain/models/Token.model';
import { injectable } from 'tsyringe';
import RedisDataSourceAdapter from '../data-source/RedisDataSource.adapter';

@injectable()
export default class RedisTokenRepository implements ITokenRepository {
  async add(token: TokenModel): Promise<TokenModel> {
    const { client } = RedisDataSourceAdapter

    await client.set(`token-id:${token.id}|user-id:${token.userId}`, JSON.stringify({
      token,
    }))

    return token
  }
}
