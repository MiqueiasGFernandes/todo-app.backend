import { PartialType } from '@domain/use-cases/_support/types/Partial.type';

export default interface IDataSourceProtocol {
  create<T>(data: T): Promise<T>

  update<T>(id: string, data: PartialType<T>): Promise<T>

  delete<T>(id: string): Promise<T>

  findOneById<T>(id: string): Promise<T>

  findOneByFields<T>(fields: {[K in keyof T]?: string | number | boolean | Date }): Promise<T>

  findAll<T>(): Promise<T>

  countByFields<T>(fields: {[K in keyof T]?: string | number | boolean | Date }): Promise<number>
}
