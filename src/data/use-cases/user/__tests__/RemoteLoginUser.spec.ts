import InvalidLoginCredentials from '@domain/exceptions/InvalidLoginCredentials.exception';
import Token from '@domain/models/Token.model';
import User from '@domain/models/User.model';
import { ILoginUserUseCase } from '@domain/use-cases/user/LoginUser.use-case';
import { faker } from '@faker-js/faker';
import { container } from 'tsyringe';
import UserContainer from '../User.container';

describe('RemoteLoginUser', () => {
  beforeEach(() => {
    UserContainer.inject()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('GIVEN login user', () => {
    test('WHEN successfully. SHOULD returns JWT token', async () => {
      container
        .register('UserRepository', {
          useFactory: () => ({
            findByEmailAndPassword: () => ({
              id: faker.datatype.uuid(),
              email: faker.internet.email(),
              name: faker.name.firstName(),
              password: faker.internet.password(),
              active: true,
            } as User),
          }),
        })
        .register('TokenRepository', {
          useFactory: () => ({
            add: () => ({
              id: faker.datatype.uuid(),
              value: faker.datatype.string(100),
              expired: false,
            } as Token),
          }),
        })
        .register('EncryptatorProtocol', {
          useFactory: () => ({
            crypt: () => faker.datatype.string(),
          }),
        })
        .register('JwtSigner', {
          useFactory: () => ({
            sign: () => (faker.datatype.string()),
          }),
        })
        .register('ConfigProtocol', {
          useFactory: () => ({
            getString: () => faker.internet.url(),
          }),
        })
        .register('IdGeneratorProtocol', {
          useFactory: () => ({
            generate: () => faker.datatype.uuid(),
          }),
        })

      const remoteLoginUser: ILoginUserUseCase = container.resolve<ILoginUserUseCase>('LoginUser')

      const sut = await remoteLoginUser.login(
        faker.internet.email(),
        faker.internet.password(),
      )

      expect(typeof sut.value).toBe('string')
      expect(sut).toHaveProperty('expired', false)
    });
    test('WHEN user has incorrect email/password or is not actived. SHOULD informs this', async () => {
      container
        .register('UserRepository', {
          useFactory: () => ({
            findByEmailAndPassword: () => (null),
          }),
        })

      const remoteLoginUser: ILoginUserUseCase = container.resolve<ILoginUserUseCase>('LoginUser')

      const sut = remoteLoginUser.login(
        faker.internet.email(),
        faker.internet.password(),
      )

      await expect(sut).rejects.toThrow(InvalidLoginCredentials)
    });
  });
});
