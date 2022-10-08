import IDataSourceProtocol from '@data/protocols/database/DataSource.protocol';
import { PartialType } from '@domain/use-cases/_support/types/Partial.type';
import { injectable } from 'tsyringe';
import { BaseEntity } from 'typeorm';
import ModelToEntityFactory from '../mappers/ModelToEntity.factory';
import DataSourceConnection from './DataSource.config';

@injectable()
export default class TypeOrmDataSourceAdapter implements IDataSourceProtocol {
  private readonly isConnected: boolean = false;

  private readonly dataSourceConnection: DataSourceConnection

  constructor(dataSourceConnection: DataSourceConnection) {
    this.dataSourceConnection = dataSourceConnection;
  }

  async create<T>(data: T): Promise<T> {
    await this.dataSourceConnection.connect(this.isConnected)

    const entity: BaseEntity = ModelToEntityFactory.makeEntity<T>(data)

    const entitySaved: BaseEntity = await entity.save()

    const newData: object = { ...data } as object

    const model: T = Object.assign(newData, entitySaved) as T

    return model
  }

  async update<T>(id: string, data: PartialType<T>): Promise<T> {
    await this.dataSourceConnection.connect(this.isConnected)

    throw new Error('Method not implemented.');
  }

  async delete<T>(id: string): Promise<T> {
    await this.dataSourceConnection.connect(this.isConnected)

    throw new Error('Method not implemented.');
  }

  async findOneById<T>(id: string): Promise<T> {
    await this.dataSourceConnection.connect(this.isConnected)

    throw new Error('Method not implemented.');
  }

  async findOneByFields<T>(
    fields:
    { [K in keyof T]?: string | number | boolean | Date | undefined; },
  ): Promise<T> {
    await this.dataSourceConnection.connect(this.isConnected)

    throw new Error('Method not implemented.');
  }

  async findAll<T>(): Promise<T> {
    await this.dataSourceConnection.connect(this.isConnected)

    throw new Error('Method not implemented.');
  }

  async countByFields<T>(fields:
    { [K in keyof T]?: string | number | boolean | Date | undefined; }): Promise<number> {
    await this.dataSourceConnection.connect(this.isConnected)

    throw new Error('Method not implemented.');
  }
}
