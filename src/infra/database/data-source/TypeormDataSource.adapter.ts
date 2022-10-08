import IDataSourceProtocol from '@data/protocols/database/DataSource.protocol';
import { PartialType } from '@domain/use-cases/_support/types/Partial.type';
import { BaseEntity } from 'typeorm';
import ModelToEntityFactory from '../mappers/ModelToEntity.factory';

export default class TypeOrmDataSourceAdapter implements IDataSourceProtocol {
  async create<T>(data: T): Promise<T> {
    const entity: BaseEntity = ModelToEntityFactory.makeEntity<T>(data)

    const entitySaved: BaseEntity = await entity.save()

    const newData: object = { ...data } as object

    const model: T = Object.assign(newData, entitySaved) as T

    return model
  }

  update<T>(id: string, data: PartialType<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  delete<T>(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }

  findOneById<T>(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }

  findOneByFields<T>(
    fields:
    { [K in keyof T]?: string | number | boolean | Date | undefined; },
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }

  findAll<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }

  countByFields<T>(fields:
    { [K in keyof T]?: string | number | boolean | Date | undefined; }): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
