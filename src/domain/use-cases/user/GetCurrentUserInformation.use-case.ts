import User from '@domain/models/User.model';

export interface IGetCurrentUserInformationUseCase {
  me(token: string): Promise<User>
}
