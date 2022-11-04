import IUserRepository from '@data/repositories/User.repository';
import ResourceNotFoundException from '@domain/exceptions/ResourceNotFound.exception';
import { IInactiveUserUseCase } from '@domain/use-cases/user/InactiveUser.use-case';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class RemoteInactiveUser implements IInactiveUserUseCase {
  private readonly userRepository: IUserRepository

  constructor(
  @inject('UserRepository') userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository
  }

  async inactive(id: string): Promise<void> {
    const hasUser: boolean = await this.userRepository.count(id) > 0

    if (!hasUser) {
      throw new ResourceNotFoundException('User', { id })
    }

    await this.userRepository.delete(id)
  }
}
