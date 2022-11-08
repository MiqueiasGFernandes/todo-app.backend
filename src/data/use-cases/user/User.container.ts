import MainContainer from '@data/di/MainContainer';
import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';
import { IGetCurrentUserInformationUseCase } from '@domain/use-cases/user/GetCurrentUserInformation.use-case';
import { IInactiveUserUseCase } from '@domain/use-cases/user/InactiveUser.use-case';
import { ILoginUserUseCase } from '@domain/use-cases/user/LoginUser.use-case';
import { ISignoutUserUseCase } from '@domain/use-cases/user/SignoutUser.use-case';
import { IUpdateUserUseCase } from '@domain/use-cases/user/UpdateUser.use-case';
import { container } from 'tsyringe';
import RemoteAddUser from './RemoteAddUser';
import RemoteInactiveUser from './RemoteInactiveUser';
import RemoteLoginUser from './RemoteLoginUser';
import RemoteUpdateUser from './RemoteUpdateUser';
import RemoteUserInformation from './RemoteUserInformation';
import RemoteUserSignOut from './RemoteUserSignOut';

export default class UserContainer extends MainContainer {
  static inject(): void {
    container
      .register<IAddUserUseCase>('AddUser', {
      useClass: RemoteAddUser,
    })
      .register<ILoginUserUseCase>('LoginUser', {
      useClass: RemoteLoginUser,
    })
      .register<IGetCurrentUserInformationUseCase>('GetCurrentUserInformation', {
      useClass: RemoteUserInformation,
    })
      .register<IInactiveUserUseCase>('InactiveUser', {
      useClass: RemoteInactiveUser,
    })
      .register<ISignoutUserUseCase>('SignOutUser', {
      useClass: RemoteUserSignOut,
    })
      .register<IUpdateUserUseCase>('UpdateUser', {
      useClass: RemoteUpdateUser,
    })
  }
}
