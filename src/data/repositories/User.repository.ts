import User from '@domain/models/User.model';

export default interface IUserRepository {
  add(data: User): Promise<User>
  delete(id: string): Promise<string>
  findOneOrFail(id: string): Promise<User>
  update(id: string, data: User): Promise<string>
  findByEmailAndPassword(email: string, password: string): Promise<User | undefined>
  countByEmail(email: string): Promise<number>
}
