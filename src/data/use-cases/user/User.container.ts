import MainContainer from '@data/di/MainContainer';
import UserRepository from '@data/repositories/User.repository';
import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';
import { container } from 'tsyringe';
import IUserRepository from '../../protocols/repositories/UserRepository.protocol';
import RemoteAddUser from './RemoteAddUser';

export default class UserContainer extends MainContainer {
  static inject(): void {
    container
      .register<IAddUserUseCase>('AddUser', {
        useClass: RemoteAddUser,
      })
      .register<IUserRepository>('UserRepository', {
        useClass: UserRepository,
      })
  }
}
