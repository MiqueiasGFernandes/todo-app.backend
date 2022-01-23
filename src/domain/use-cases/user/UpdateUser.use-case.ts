import { User } from '@domain/models/User.model';

export interface IUpdateUserUseCase {
  update(user: User): Promise<User>
}
