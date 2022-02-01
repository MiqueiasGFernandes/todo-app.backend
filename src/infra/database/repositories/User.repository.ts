import { IUserRepository } from '@data/protocols/repositories/User.repository';
import { User as UserModel } from '@domain/models/User.model';
import {
  EntityRepository, getRepository, Repository,
} from 'typeorm';
import List from '../entities/List.entity';
import UserEntity from '../entities/User.entity';

@EntityRepository()
export default class UserRepository implements IUserRepository<UserEntity> {
  private readonly repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }

  async findOne(id: string): Promise<UserEntity | undefined> {
    return this.repository.findOne(id);
  }

  async update(id: string, data: UserEntity): Promise<string> {
    await this.repository.update(
      id,
      data,
    );

    return id;
  }

  async add(data: UserModel): Promise<UserEntity> {
    const userData = new UserEntity();

    userData.id = data.id;
    userData.email = data.email;
    userData.active = data.active;
    userData.lists = data.lists as List[];
    userData.active = data.active;

    const savedUsers = await this.repository.save(userData);

    return savedUsers;
  }

  async delete(id: string): Promise<string> {
    await this.repository.update(id, {
      active: false,
    });

    return id;
  }

  async findByEmailAndPassword(email: string, password: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({
      where: {
        email,
        password,
      },
    });
  }
}
