import IUserRepository from '@data/repositories/User.repository';
import UserModel from '@domain/models/User.model';
import { DeepPartial } from 'typeorm';
import UserEntity from '../entities/User.entity';

export default class TypeOrmUserRepository implements IUserRepository {
  count(id: string): Promise<number> {
    return UserEntity.countBy({ id })
  }

  async add(data: UserModel): Promise<UserModel> {
    const userTypeOrmEntity: UserEntity = new UserEntity()

    userTypeOrmEntity.id = data.id as string
    userTypeOrmEntity.name = data.name
    userTypeOrmEntity.email = data.email
    userTypeOrmEntity.active = false
    userTypeOrmEntity.password = data.password

    await userTypeOrmEntity.save()

    return data
  }

  async delete(id: string): Promise<void> {
    await UserEntity.delete(id)
  }

  async findOneOrFail(id: string): Promise<UserModel> {
    const userTypeOrmEntity: UserEntity = await UserEntity.findOneByOrFail({
      id,
    })

    const user = new UserModel()

    user.id = userTypeOrmEntity.id
    user.active = userTypeOrmEntity.active
    user.email = userTypeOrmEntity.email
    user.name = userTypeOrmEntity.name
    user.password = userTypeOrmEntity.password

    return user
  }

  async update(id: string, data: { [K in keyof UserModel]?: unknown }): Promise<void> {
    await UserEntity.findOneByOrFail({
      id,
    })
    await UserEntity.save(data as DeepPartial<UserEntity>)
  }

  async findByEmailAndPassword(email: string, password: string): Promise<UserModel | undefined> {
    const userTypeOrmEntity: UserEntity | null = await UserEntity.findOneBy({
      email,
      password,
      active: true,
    })

    if (userTypeOrmEntity) {
      const userModel: UserModel = new UserModel()

      userModel.id = userTypeOrmEntity.id
      userModel.active = userTypeOrmEntity.active
      userModel.email = userTypeOrmEntity.email
      userModel.name = userTypeOrmEntity.name
      userModel.password = userTypeOrmEntity.password

      return userModel
    }

    return undefined
  }

  async countByEmail(email: string): Promise<number> {
    const count: number = await UserEntity.countBy({
      email,
    })

    return count
  }
}
