import IConfigProtocol from '@data/protocols/config/Config.protocol';
import { IJwtSignerProtocol } from '@data/protocols/jwt/JwtSigner.protocol';
import { ITokenRepository } from '@data/repositories/Token.repository';
import ResourceNotFoundException from '@domain/exceptions/ResourceNotFound.exception';
import Token from '@domain/models/Token.model';
import { ISignoutUserUseCase } from '@domain/use-cases/user/SignoutUser.use-case';
import { faker } from '@faker-js/faker';
import { MockType } from '@tests/fixtures/types/Mock.type';
import { container } from 'tsyringe';
import UserContainer from '../User.container';

describe('RemoteSignOutUser', () => {
  beforeEach(() => {
    UserContainer.inject()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('GIVEN logout user', () => {
    test('WHEN successfully. SHOULD not throws any error', async () => {
      container
        .register('TokenRepository', {
          useFactory: (): MockType<ITokenRepository> => ({
            findOneByOrFail: jest.fn(() => Promise.resolve(({
              id: faker.datatype.uuid(),
              value: faker.datatype.string(100),
              expiration: faker.datatype.number({ min: 1000000 }),
              subject: faker.datatype.uuid(),
              createdAt: new Date(),
            } as Token))),
            delete: jest.fn(() => Promise.resolve()),
          }),
        })
        .register('JwtSigner', {
          useFactory: (): MockType<IJwtSignerProtocol> => ({
            decode: jest.fn(() => ({
              id: faker.datatype.uuid(),
              value: faker.datatype.string(100),
              expiration: faker.datatype.number({ min: 1000000 }),
              subject: faker.datatype.uuid(),
              createdAt: new Date(),
            } as Token)),
          }),
        })
        .register('ConfigProtocol', {
          useFactory: (): MockType<IConfigProtocol> => ({
            getString: jest.fn(() => faker.datatype.string(1000000)),
          }),
        })

      const signOutUser = UserContainer.resolve<ISignoutUserUseCase>('SignOutUser')

      const sut = signOutUser.signOut(faker.datatype.string(100))
      await expect(sut).resolves.not.toThrow()
    });
    test('WHEN token with passed id does not exists. SHOULD informs that resource is not found', async () => {
      container
        .register('TokenRepository', {
          useFactory: (): MockType<ITokenRepository> => ({
            findOneByOrFail: jest.fn(() => Promise.reject()),
          }),
        })
        .register('JwtSigner', {
          useFactory: (): MockType<IJwtSignerProtocol> => ({
            decode: jest.fn(() => ({
              id: faker.datatype.uuid(),
              value: faker.datatype.string(100),
              expiration: faker.datatype.number({ min: 1000000 }),
              subject: faker.datatype.uuid(),
              createdAt: new Date(),
            } as Token)),
          }),
        })
        .register('ConfigProtocol', {
          useFactory: (): MockType<IConfigProtocol> => ({
            getString: jest.fn(() => faker.datatype.string(1000000)),
          }),
        })

      const signOutUser = UserContainer.resolve<ISignoutUserUseCase>('SignOutUser')

      const sut = signOutUser.signOut(faker.datatype.string(100))
      await expect(sut).rejects.toThrow(ResourceNotFoundException)
    });
  });
});
