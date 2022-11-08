import User from '@domain/models/User.model';

export interface IUpdateUserUseCase {
  update(user: {[K in keyof User]?: unknown }): Promise<void>
}
