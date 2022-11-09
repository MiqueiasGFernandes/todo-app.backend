import { IEncryptatorProtocol } from '@data/protocols/encryptator/Encryptator.protocol';
import { IPasswordValidatorProtocol } from '@data/protocols/password-validator/PasswordValidator.protocol';
import IUserRepository from '@data/repositories/User.repository';
import IncorrectPasswordException from '@domain/exceptions/IncorrectPassword.exception';
import PasswordsDoNotMatchException from '@domain/exceptions/PasswordsDoNotMatch.exception';
import StronglessPasswordException from '@domain/exceptions/StronglessPassword.exception';
import { IChangeUserPasswordUseCase } from '@domain/use-cases/user/ChangeUserPassword.use-case';
import { faker } from '@faker-js/faker';
import { MockType } from '@tests/fixtures/types/Mock.type';
import { container } from 'tsyringe';
import UserContainer from '../User.container';

describe('RemotePasswordChanger', () => {
  beforeEach(() => {
    UserContainer.inject()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('GIVEN try to update password', () => {
    test('WHEN success. SHOULD not throws any error', async () => {
      container
        .register('UserRepository', {
          useFactory: (): MockType<IUserRepository> => ({
            findByIdAndPasswordOrFail: jest.fn(() => Promise.resolve({})),
            update: jest.fn(() => Promise.resolve()),
          }),
        })
        .register('PasswordValidator', {
          useFactory: (): MockType<IPasswordValidatorProtocol> => ({
            validate: jest.fn(() => ({
              isValid: true,
              errors: [],
            })),
          }),
        })
        .register('EncryptatorProtocol', {
          useFactory: (): MockType<IEncryptatorProtocol> => ({
            crypt: jest.fn(() => faker.datatype.string(50)),
          }),
        })

      const remotePasswordChanger = UserContainer.resolve<IChangeUserPasswordUseCase>('ChangeUserPassword')

      const newPassword = faker.internet.password()

      const sut = remotePasswordChanger.update(
        faker.datatype.uuid(),
        faker.internet.password(),
        newPassword,
        newPassword,
      )

      await expect(sut).resolves.not.toThrow()
    });
    test('WHEN old password is incorrect. SHOULD inform\'s that user has not permission to perform this update', async () => {
      container
        .register('UserRepository', {
          useFactory: (): MockType<IUserRepository> => ({
            findByIdAndPasswordOrFail: jest.fn(() => Promise.reject()),
            update: jest.fn(() => Promise.resolve()),
          }),
        })
        .register('PasswordValidator', {
          useFactory: (): MockType<IPasswordValidatorProtocol> => ({
            validate: jest.fn(() => ({
              isValid: true,
              errors: [],
            })),
          }),
        })
        .register('EncryptatorProtocol', {
          useFactory: (): MockType<IEncryptatorProtocol> => ({
            crypt: jest.fn(() => faker.datatype.string(50)),
          }),
        })

      const remotePasswordChanger = UserContainer.resolve<IChangeUserPasswordUseCase>('ChangeUserPassword')

      const newPassword = faker.internet.password()

      const sut = remotePasswordChanger.update(
        faker.datatype.uuid(),
        faker.internet.password(),
        newPassword,
        newPassword,
      )

      await expect(sut).rejects.toThrow(IncorrectPasswordException)
    });
    test('WHEN new password and new password confirmation doest not matches. SHOULD informs this', async () => {
      container
        .register('UserRepository', {
          useFactory: (): MockType<IUserRepository> => ({
            findByIdAndPasswordOrFail: jest.fn(() => Promise.resolve({})),
            update: jest.fn(() => Promise.resolve()),
          }),
        })
        .register('PasswordValidator', {
          useFactory: (): MockType<IPasswordValidatorProtocol> => ({
            validate: jest.fn(() => ({
              isValid: true,
              errors: [],
            })),
          }),
        })
        .register('EncryptatorProtocol', {
          useFactory: (): MockType<IEncryptatorProtocol> => ({
            crypt: jest.fn(() => faker.datatype.string(50)),
          }),
        })

      const remotePasswordChanger = UserContainer.resolve<IChangeUserPasswordUseCase>('ChangeUserPassword')

      const newPassword = faker.internet.password()

      const sut = remotePasswordChanger.update(
        faker.datatype.uuid(),
        faker.internet.password(),
        faker.internet.password(),
        newPassword,
      )

      await expect(sut).rejects.toThrow(PasswordsDoNotMatchException)
    });
    test('WHEN new password is strongless. SHOULD inform the correct password pattern', async () => {
      container
        .register('UserRepository', {
          useFactory: (): MockType<IUserRepository> => ({
            findByIdAndPasswordOrFail: jest.fn(() => Promise.resolve({})),
            update: jest.fn(() => Promise.resolve()),
          }),
        })
        .register('PasswordValidator', {
          useFactory: (): MockType<IPasswordValidatorProtocol> => ({
            validate: jest.fn(() => ({
              isValid: false,
              errors: ['Must have symbols'],
            })),
          }),
        })
        .register('EncryptatorProtocol', {
          useFactory: (): MockType<IEncryptatorProtocol> => ({
            crypt: jest.fn(() => faker.datatype.string(50)),
          }),
        })

      const remotePasswordChanger = UserContainer.resolve<IChangeUserPasswordUseCase>('ChangeUserPassword')

      const sut = remotePasswordChanger.update(
        faker.datatype.uuid(),
        faker.internet.password(),
        'any',
        'any',
      )

      await expect(sut).rejects.toThrow(StronglessPasswordException)
    });
  });
});
