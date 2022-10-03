import User from '@domain/models/User.model';

export interface IAddUserUseCase {
  add(user: User): Promise<User>
}
