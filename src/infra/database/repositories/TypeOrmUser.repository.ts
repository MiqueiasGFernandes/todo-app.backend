import IUserRepository from '@data/repositories/User.repository';
import UserModel from '@domain/models/User.model';
import UserEntity from '../entities/User.entity';

export default class TypeOrmUserRepository implements IUserRepository {
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

  delete(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<UserModel | null | undefined> {
    throw new Error('Method not implemented.');
  }

  update(id: string, data: UserModel): Promise<string> {
    throw new Error('Method not implemented.');
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
