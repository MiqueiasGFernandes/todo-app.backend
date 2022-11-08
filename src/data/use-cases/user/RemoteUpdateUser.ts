import IUserRepository from '@data/repositories/User.repository';
import ResourceNotFoundException from '@domain/exceptions/ResourceNotFound.exception';
import UpdateNotAllowedException from '@domain/exceptions/UpdateNotAllowed.exception';
import UserModel from '@domain/models/User.model';
import { IUpdateUserUseCase } from '@domain/use-cases/user/UpdateUser.use-case';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class RemoteUpdateUser implements IUpdateUserUseCase {
  private readonly userRepository: IUserRepository

  constructor(
  @inject('UserRepository') userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository
  }

  async update(user: {[K in keyof UserModel]?: unknown }): Promise<void> {
    const allowedToUpdatedFields: (keyof UserModel)[] = ['name']

    const userKeys: (keyof UserModel)[] = Object.keys(user).filter((key) => key !== 'id') as (keyof UserModel)[]

    userKeys.forEach((key) => {
      if (!allowedToUpdatedFields.includes(key) && key) {
        throw new UpdateNotAllowedException('Update not allowed: Some fields which your had passed is not allowed to update')
      }
    })

    await this.userRepository.update(
      user.id as string,
      user,
    ).catch(() => {
      throw new ResourceNotFoundException('User', { id: user.id as string })
    })
  }
}
