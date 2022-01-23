import { User } from '@domain/models/User.model';

export interface GetCurrentUserInformationUseCase {
  me(id: string): Promise<User>
}
