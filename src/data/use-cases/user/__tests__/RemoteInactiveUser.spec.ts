import IUserRepository from '@data/repositories/User.repository';
import ResourceNotFoundException from '@domain/exceptions/ResourceNotFound.exception';
import { IInactiveUserUseCase } from '@domain/use-cases/user/InactiveUser.use-case';
import { faker } from '@faker-js/faker';
import { MockType } from '@tests/fixtures/types/Mock.type';
import { container } from 'tsyringe';
import UserContainer from '../User.container';

describe('RemoteInactiveUser', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  beforeEach(() => {
    UserContainer.inject()
  })
  describe('GIVEN inactive user', () => {
    test('WHEN successfully. SHOULD delete user without show any error', async () => {
      container.register('UserRepository', {
        useFactory: (): MockType<IUserRepository> => ({
          count: jest.fn(() => 1),
          delete: jest.fn(() => Promise.resolve()),
        }),
      })

      const inactiveUser: IInactiveUserUseCase = container.resolve<IInactiveUserUseCase>('InactiveUser')

      const sut = inactiveUser.inactive(faker.datatype.uuid())
      await expect(sut).resolves.not.toThrow()
    });
    test('WHEN user with passed id not found. SHOULD returns an error informing that resource nof found', async () => {
      container.register('UserRepository', {
        useFactory: (): MockType<IUserRepository> => ({
          count: jest.fn(() => 0),
          delete: jest.fn(() => Promise.resolve()),
        }),
      })

      const inactiveUser: IInactiveUserUseCase = container.resolve<IInactiveUserUseCase>('InactiveUser')

      const sut = inactiveUser.inactive(faker.datatype.uuid())
      await expect(sut).rejects.toThrow(ResourceNotFoundException)
    });
  });
});
