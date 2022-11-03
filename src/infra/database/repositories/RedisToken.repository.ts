import { ITokenRepository } from '@data/repositories/Token.repository';
import TokenModel from '@domain/models/Token.model';
import { injectable } from 'tsyringe';
import RedisDataSourceAdapter from '../data-source/RedisDataSource.adapter';

@injectable()
export default class RedisTokenRepository implements ITokenRepository {
  async findOneByOrFail(params: { subjectId: string }): Promise<TokenModel> {
    const { client } = RedisDataSourceAdapter

    const strToken: string | null = await client.get(`token_subject-id:${params.subjectId}`)

    if (!strToken) {
      return Promise.reject()
    }

    const token = JSON.parse(strToken) as TokenModel

    return token
  }

  async add(token: TokenModel): Promise<TokenModel> {
    const { client } = RedisDataSourceAdapter

    await client.set(`token_subject-id:${token.subject as string}`, JSON.stringify({
      token,
    }))

    return token
  }
}
