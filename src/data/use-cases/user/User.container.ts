import MainContainer from '@data/di/MainContainer';
import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';
import { ILoginUserUseCase } from '@domain/use-cases/user/LoginUser.use-case';
import { container } from 'tsyringe';
import RemoteAddUser from './RemoteAddUser';
import RemoteLoginUser from './RemoteLoginUser';

export default class UserContainer extends MainContainer {
  static inject(): void {
    container
      .register<IAddUserUseCase>('AddUser', {
        useClass: RemoteAddUser,
      })
      .register<ILoginUserUseCase>('LoginUser', {
        useClass: RemoteLoginUser,
      })
  }
}
