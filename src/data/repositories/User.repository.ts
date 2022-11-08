import User from '@domain/models/User.model';

export default interface IUserRepository {
  add(data: User): Promise<User>
  delete(id: string): Promise<void>
  findOneOrFail(id: string): Promise<User>
  update(id: string, data: { [K in keyof User]?: unknown }): Promise<void>
  findByEmailAndPassword(email: string, password: string): Promise<User | undefined>
  countByEmail(email: string): Promise<number>
  count(id: string): Promise<number>
}
