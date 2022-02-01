export interface IUserRepository<T> {
  add(data: T): Promise<T>
  delete(id: string): Promise<string>
  findOne(id: string): Promise<T | undefined>
  update(id: string, data: T): Promise<string>
  findByEmailAndPassword(email: string, password: string): Promise<T | undefined>
}
