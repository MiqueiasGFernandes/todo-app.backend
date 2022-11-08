import IUserRepository from '@data/repositories/User.repository';
import ResourceNotFoundException from '@domain/exceptions/ResourceNotFound.exception';
import UpdateNotAllowedException from '@domain/exceptions/UpdateNotAllowed.exception';
import { IUpdateUserUseCase } from '@domain/use-cases/user/UpdateUser.use-case';
import { faker } from '@faker-js/faker';
import { MockType } from '@tests/fixtures/types/Mock.type';
import { container } from 'tsyringe';
import UserContainer from '../User.container';

describe('RemoteUpdateUser', () => {
  beforeEach(() => {
    UserContainer.inject()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('GIVEN update user data', () => {
    test('WHEN update data. SHOULD not throws any error', async () => {
      container.register('UserRepository', {
        useFactory: (): MockType<IUserRepository> => ({
          update: jest.fn(() => Promise.resolve()),
        }),
      })

      const remoteUpdateUser: IUpdateUserUseCase = UserContainer.resolve<IUpdateUserUseCase>('UpdateUser')

      const sut = remoteUpdateUser.update({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
      })

      await expect(sut).resolves.not.toThrow()
    });
    test('WHEN User with matching id does not exists. SHOULD inform\'s that resource is not found', async () => {
      container.register('UserRepository', {
        useFactory: (): MockType<IUserRepository> => ({
          update: jest.fn(() => Promise.reject()),
        }),
      })

      const remoteUpdateUser: IUpdateUserUseCase = UserContainer.resolve<IUpdateUserUseCase>('UpdateUser')

      const sut = remoteUpdateUser.update({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
      })

      await expect(sut).rejects.toThrow(ResourceNotFoundException)
    });
    test('WHEN try to update not allowed field. SHOULD inform\'s that user is not authorized to update this field', async () => {
      container.register('UserRepository', {
        useFactory: (): MockType<IUserRepository> => ({
          update: jest.fn(() => Promise.reject()),
        }),
      })
      const remoteUpdateUser: IUpdateUserUseCase = UserContainer.resolve<IUpdateUserUseCase>('UpdateUser')

      const sut = remoteUpdateUser.update({
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
      })

      await expect(sut).rejects.toThrow(UpdateNotAllowedException)
    });
  });
});
