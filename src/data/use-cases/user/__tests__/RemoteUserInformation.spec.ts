import IConfigProtocol from '@data/protocols/config/Config.protocol';
import { IJwtSignerProtocol } from '@data/protocols/jwt/JwtSigner.protocol';
import { ITokenRepository } from '@data/repositories/Token.repository';
import IUserRepository from '@data/repositories/User.repository';
import InvalidTokenSignatureException from '@domain/exceptions/InvalidTokenSignature.exception';
import SessionExpiredException from '@domain/exceptions/SessionExpired.exception';
import UnauthorizedException from '@domain/exceptions/Unauthorized.exception';
import Token from '@domain/models/Token.model';
import User from '@domain/models/User.model';
import { IGetCurrentUserInformationUseCase } from '@domain/use-cases/user/GetCurrentUserInformation.use-case';
import { faker } from '@faker-js/faker';
import { MockType } from '@tests/fixtures/types/Mock.type';
import { TokenExpiredError } from 'jsonwebtoken';
import { container } from 'tsyringe';
import UserContainer from '../User.container';

describe('RemoteUserInformation', () => {
  beforeEach(() => {
    UserContainer.inject()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('GIVEN get current user information', () => {
    test('WHEN successfully. SHOULD returns a user information', async () => {
      container
        .register('UserRepository', {
          useFactory: (): MockType<IUserRepository> => ({
            findOneOrFail: jest.fn(() => Promise.resolve(({
              name: faker.name.firstName(),
              active: true,
              email: faker.internet.email(),
              password: faker.internet.password(),
              id: faker.datatype.uuid(),

            } as User))),
          }),
        })
        .register('TokenRepository', {
          useFactory: (): MockType<ITokenRepository> => ({
            findOneByOrFail: jest.fn(() => Promise.resolve(({
              id: faker.datatype.uuid(),
              expired: false,
              value: faker.datatype.string(100),
              createdAt: new Date(),
              expiration: faker.datatype.number({ min: 100000 }),
              subject: faker.datatype.uuid(),
            } as Token))),
          }),
        })
        .register('JwtSigner', {
          useFactory: (): MockType<IJwtSignerProtocol> => ({
            decode: jest.fn(() => Promise.resolve(faker.datatype.string())),
          }),
        })
        .register('ConfigProtocol', {
          useFactory: (): MockType<IConfigProtocol> => ({
            getString: jest.fn(() => faker.datatype.string(50000)),
          }),
        })

      const service: IGetCurrentUserInformationUseCase = container
        .resolve<IGetCurrentUserInformationUseCase>('GetCurrentUserInformation')

      const sut = await service.me(faker.datatype.string())
      expect(sut).toHaveProperty('id')
      expect(sut).toHaveProperty('name')
      expect(sut).toHaveProperty('password')
      expect(sut).toHaveProperty('email')
      expect(sut).toHaveProperty('active')
    });
    test('WHEN JWT is expired by date. SHOULD informs which User has not permission to perform this action', async () => {
      container
        .register('UserRepository', {
          useFactory: (): MockType<IUserRepository> => ({
            findOneOrFail: jest.fn(() => Promise.resolve(({
              name: faker.name.firstName(),
              active: true,
              email: faker.internet.email(),
              password: faker.internet.password(),
              id: faker.datatype.uuid(),

            } as User))),
          }),
        })
        .register('TokenRepository', {
          useFactory: (): MockType<ITokenRepository> => ({
            findOneByOrFail: jest.fn(() => Promise.resolve(({
              id: faker.datatype.uuid(),
              expired: false,
              value: faker.datatype.string(100),
              createdAt: new Date(),
              expiration: faker.datatype.number({ min: 100000 }),
              subject: faker.datatype.uuid(),
            } as Token))),
          }),
        })
        .register('JwtSigner', {
          useFactory: (): MockType<IJwtSignerProtocol> => ({
            decode: jest.fn(() => Promise.reject(TokenExpiredError)),
          }),
        })
        .register('ConfigProtocol', {
          useFactory: (): MockType<IConfigProtocol> => ({
            getString: jest.fn(() => faker.datatype.string(50000)),
          }),
        })

      const service: IGetCurrentUserInformationUseCase = container
        .resolve<IGetCurrentUserInformationUseCase>('GetCurrentUserInformation')

      const sut = service.me(faker.datatype.string())
      await expect(sut).rejects.toThrow(SessionExpiredException)
    });
    test('WHEN JWT has invalid signature. SHOULD informs which User has not permission to perform this action', async () => {
      container
        .register('UserRepository', {
          useFactory: (): MockType<IUserRepository> => ({
            findOneOrFail: jest.fn(() => Promise.resolve(({
              name: faker.name.firstName(),
              active: true,
              email: faker.internet.email(),
              password: faker.internet.password(),
              id: faker.datatype.uuid(),

            } as User))),
          }),
        })
        .register('TokenRepository', {
          useFactory: (): MockType<ITokenRepository> => ({
            findOneByOrFail: jest.fn(() => Promise.resolve(({
              id: faker.datatype.uuid(),
              expired: false,
              value: faker.datatype.string(100),
              createdAt: new Date(),
              expiration: faker.datatype.number({ min: 100000 }),
              subject: faker.datatype.uuid(),
            } as Token))),
          }),
        })
        .register('JwtSigner', {
          useFactory: (): MockType<IJwtSignerProtocol> => ({
            decode: jest.fn(() => Promise.reject(new Error())),
          }),
        })
        .register('ConfigProtocol', {
          useFactory: (): MockType<IConfigProtocol> => ({
            getString: jest.fn(() => faker.datatype.string(50000)),
          }),
        })

      const service: IGetCurrentUserInformationUseCase = container
        .resolve<IGetCurrentUserInformationUseCase>('GetCurrentUserInformation')

      const sut = service.me(faker.datatype.string())
      await expect(sut).rejects.toThrow(InvalidTokenSignatureException)
    });
    test('WHEN JWT does not exists. SHOULD informs which User has not permission to perform this action', async () => {
      container
        .register('UserRepository', {
          useFactory: (): MockType<IUserRepository> => ({
            findOneOrFail: jest.fn(() => Promise.resolve(({
              name: faker.name.firstName(),
              active: true,
              email: faker.internet.email(),
              password: faker.internet.password(),
              id: faker.datatype.uuid(),

            } as User))),
          }),
        })
        .register('JwtSigner', {
          useFactory: (): MockType<IJwtSignerProtocol> => ({
            decode: jest.fn(() => Promise.resolve(faker.datatype.string())),
          }),
        })
        .register('TokenRepository', {
          useFactory: (): MockType<ITokenRepository> => ({
            findOneByOrFail: jest.fn(() => Promise.reject()),
          }),
        })
        .register('ConfigProtocol', {
          useFactory: (): MockType<IConfigProtocol> => ({
            getString: jest.fn(() => faker.datatype.string(50000)),
          }),
        })

      const service: IGetCurrentUserInformationUseCase = container
        .resolve<IGetCurrentUserInformationUseCase>('GetCurrentUserInformation')

      const sut = service.me(faker.datatype.string())
      await expect(sut).rejects.toThrow(UnauthorizedException)
    });
    test('WHEN User from JWT does not exists. SHOULD informs which User has not permission to perform this action', async () => {
      container
        .register('UserRepository', {
          useFactory: (): MockType<IUserRepository> => ({
            findOneOrFail: jest.fn(() => Promise.reject()),
          }),
        })
        .register('JwtSigner', {
          useFactory: (): MockType<IJwtSignerProtocol> => ({
            decode: jest.fn(() => Promise.resolve(faker.datatype.string())),
          }),
        })
        .register('TokenRepository', {
          useFactory: (): MockType<ITokenRepository> => ({
            findOneByOrFail: jest.fn(() => Promise.resolve(({
              id: faker.datatype.uuid(),
              expired: false,
              value: faker.datatype.string(100),
              createdAt: new Date(),
              expiration: faker.datatype.number({ min: 100000 }),
              subject: faker.datatype.uuid(),
            } as Token))),
          }),
        })
        .register('ConfigProtocol', {
          useFactory: (): MockType<IConfigProtocol> => ({
            getString: jest.fn(() => faker.datatype.string(50000)),
          }),
        })

      const service: IGetCurrentUserInformationUseCase = container
        .resolve<IGetCurrentUserInformationUseCase>('GetCurrentUserInformation')

      const sut = service.me(faker.datatype.string())
      await expect(sut).rejects.toThrow(UnauthorizedException)
    });
  });
});
