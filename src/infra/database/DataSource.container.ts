import MainContainer from '@data/di/MainContainer';
import { IDataSourceProtocol } from '@data/protocols/data-source/DataSource.protocol';
import { ITokenRepository } from '@data/repositories/Token.repository';
import IUserRepository from '@data/repositories/User.repository';
import { container } from 'tsyringe';
import RedisDataSourceAdapter from './data-source/RedisDataSource.adapter';
import TypeOrmDataSourceAdapter from './data-source/TypeOrmDataSource.adapter';
import RedisTokenRepository from './repositories/RedisToken.repository';
import TypeOrmUserRepository from './repositories/TypeOrmUser.repository';

export default class UserContainer extends MainContainer {
  static inject(): void {
    container
      .register<IUserRepository>(
        'UserRepository',
        {
          useClass: TypeOrmUserRepository,
        },
      )
      .register<IDataSourceProtocol>('DatabaseDataSource', {
        useClass: TypeOrmDataSourceAdapter,
      })
      .register<IDataSourceProtocol>('CacheDataSource', {
        useClass: RedisDataSourceAdapter,
      })
      .register<ITokenRepository>('TokenRepository', {
        useClass: RedisTokenRepository,
      })
  }
}
