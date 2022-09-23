import IUserRepository from '@data/protocols/repositories/UserRepository.protocol';
import UserAlreadyExistsException from '@domain/exceptions/UserAlreadyExists.exception';
import User from '@domain/models/User.model';
import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';

export default class RemoteAddUser implements IAddUserUseCase {
  private readonly userRepository: IUserRepository;

  constructor(
    userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  async add(user: User): Promise<User> {
    const hasUser: boolean = (await this.userRepository.countByEmail(user.email)) > 0

    if (!hasUser) {
      throw new UserAlreadyExistsException(`An user with email: '${user.email}' already exists. Please, type an valid email and try again `)
    }

    return this.userRepository.add(user);
  }
}
