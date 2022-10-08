import MainContainer from '@data/di/MainContainer';
import IDataSourceProtocol from '@data/protocols/database/DataSource.protocol';
import { container } from 'tsyringe';
import TypeOrmDataSourceAdapter from './TypeormDataSource.adapter';

export default class DataSourceContainer extends MainContainer {
  static inject(): void {
    container.register<IDataSourceProtocol>('DataSourceProtocol', {
      useClass: TypeOrmDataSourceAdapter,
    })
  }
}
