import { inject, injectable } from 'tsyringe';
import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';
import { User } from '@domain/models/User.model';
import { IUserRepository } from '@data/protocols/repositories/User.repository';

@injectable()
export default class RemoteAddUser implements IAddUserUseCase {
  private readonly userRepository: IUserRepository<User>;

  constructor(
    @inject('UserRepository') userRepository: IUserRepository<User>,
  ) {
    this.userRepository = userRepository;
  }

  async add(user: User): Promise<User> {
    return this.userRepository.add(user);
  }
}
