import PasswordsDoNotMatchException from '@domain/exceptions/PasswordsDoNotMatch.exception';
import StronglessPasswordException from '@domain/exceptions/StronglessPassword.exception';
import UserAlreadyExistsException from '@domain/exceptions/UserAlreadyExists.exception';
import User from '@domain/models/User.model';
import { IAddUserUseCase } from '@domain/use-cases/user/AddUser.use-case';
import { MockType } from '@tests/fixtures/types/Mock.type';
import { faker } from '@faker-js/faker';

import { container } from 'tsyringe';
import { IPasswordValidatorProtocol } from '@data/protocols/password-validator/PasswordValidator.protocol';
import UserContainer from '../User.container';

const STRONGLESS_PASSWORD = 'less'
const STRONG_PASSWORD = 'Yeah! This password is approved at 2022 year'

describe('RemoteAddUser', () => {
  UserContainer.inject()
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('GIVEN add new User', () => {
    test('WHEN user is successfully added. SHOULD return created User data', async () => {
      const passwordMockValue: string = faker.datatype.string(40)

      container
        .register('UserRepository', {
          useFactory: () => ({
            add: jest.fn((data: User) => ({
              id: faker.datatype.number(),
              ...data,
            })),
            countByEmail: jest.fn(() => Promise.resolve(0)),
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
          useFactory: () => ({
            crypt: jest.fn(() => passwordMockValue),
          }),
        })

      const remoteAddUser: IAddUserUseCase = container.resolve<IAddUserUseCase>('AddUser')

      const data: User = {
        email: faker.internet.email(),
        active: false,
        password: STRONG_PASSWORD,
        passwordConfirmation: STRONG_PASSWORD,
        name: faker.name.firstName(),
      }

      const sut = await remoteAddUser.add(data)

      expect(sut).toHaveProperty('id')
      expect(sut).toHaveProperty('email', data.email)
      expect(sut).toHaveProperty('password', passwordMockValue)
      expect(sut).toHaveProperty('name', data.name)
    })
    test('WHEN user already exists. SHOULD informs that user with matching email already exists', async () => {
      container.register('UserRepository', {
        useFactory: () => ({
          countByEmail: jest.fn(() => Promise.resolve(1)),
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

      const remoteAddUser: IAddUserUseCase = container.resolve<IAddUserUseCase>('AddUser')

      const data: User = {
        email: faker.internet.email(),
        active: false,
        password: STRONG_PASSWORD,
        passwordConfirmation: STRONG_PASSWORD,
        name: faker.name.firstName(),
      }

      const sut = remoteAddUser.add(data)
      await expect(sut).rejects.toThrow(UserAlreadyExistsException)
    });
    test('WHEN password is strongless. SHOULD informs password security pattern', async () => {
      container.register('UserRepository', {
        useFactory: () => ({
          countByEmail: jest.fn(() => Promise.resolve(1)),
        }),
      })
        .register('PasswordValidator', {
          useFactory: (): MockType<IPasswordValidatorProtocol> => ({
            validate: jest.fn(() => ({
              isValid: false,
              errors: ['password must have numbers'],
            })),
          }),
        })

      const remoteAddUser: IAddUserUseCase = container.resolve<IAddUserUseCase>('AddUser')

      const data: User = {
        email: faker.internet.email(),
        active: false,
        password: STRONGLESS_PASSWORD,
        passwordConfirmation: STRONGLESS_PASSWORD,
        name: faker.name.firstName(),
      }

      const sut = remoteAddUser.add(data)
      await expect(sut).rejects.toThrow(StronglessPasswordException)
    });
    test('WHEN password and password confirmation does not matches. SHOULD informs that passwords its different', async () => {
      container.register('UserRepository', {
        useFactory: () => ({
          countByEmail: jest.fn(() => Promise.resolve(1)),
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

      const remoteAddUser: IAddUserUseCase = container.resolve<IAddUserUseCase>('AddUser')

      const data: User = {
        email: faker.internet.email(),
        active: false,
        password: 'one_pass222',
        passwordConfirmation: 'another_pass222',
        name: faker.name.firstName(),
      }

      const sut = remoteAddUser.add(data)
      await expect(sut).rejects.toThrow(PasswordsDoNotMatchException)
    });
  });
});
