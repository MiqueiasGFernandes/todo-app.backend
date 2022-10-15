import MainContainer from '@data/di/MainContainer';
import { IDataSourceProtocol } from '@data/protocols/data-source/DataSource.protocol';
import IUserRepository from '@data/repositories/User.repository';
import { container } from 'tsyringe';
import TypeOrmDataSourceAdapter from './data-source/TypeOrmDataSource.adapter';
import TypeOrmUserRepository from './repositories/TypeOrmUser.repository';

export default class UserContainer extends MainContainer {
  static inject(): void {
    container
      .register<IUserRepository>(
        'UserRepository',
        {
          useClass: TypeOrmUserRepository,
        },
      ).register<IDataSourceProtocol>('DataSource', {
        useClass: TypeOrmDataSourceAdapter,
      })
  }
}
