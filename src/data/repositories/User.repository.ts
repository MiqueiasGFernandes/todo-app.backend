import IDataSourceProtocol from '@data/protocols/database/DataSource.protocol';
import IUserRepository from '@data/protocols/repositories/UserRepository.protocol';
import UserModel from '@domain/models/User.model';
import { PartialType } from '@domain/use-cases/_support/types/Partial.type';
import { injectable } from 'tsyringe';

@injectable()
export default class UserRepository implements IUserRepository {
  private readonly databaseSourceProtocol: IDataSourceProtocol;

  async countByEmail(email: string): Promise<number> {
    return this.databaseSourceProtocol.countByFields<UserModel>({
      email,
    })
  }

  async add(data: UserModel): Promise<UserModel> {
    return this.databaseSourceProtocol.create(data);
  }

  async delete(id: string): Promise<string> {
    return this.databaseSourceProtocol.delete(id);
  }

  async findOne(id: string): Promise<UserModel | null | undefined> {
    return this.databaseSourceProtocol.findOneById(id);
  }

  async update(id: string, data: PartialType<UserModel>): Promise<string> {
    await this.databaseSourceProtocol.update<UserModel>(id, data);

    return id
  }

  async findByEmailAndPassword(email: string, password: string): Promise<UserModel | undefined> {
    return this.databaseSourceProtocol.findOneByFields<UserModel>({
      email,
      password,
    });
  }
}
