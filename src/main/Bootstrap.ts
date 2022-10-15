import 'reflect-metadata';

import IConfigProtocol from '@data/protocols/config/Config.protocol';
import { IDataSourceProtocol } from '@data/protocols/data-source/DataSource.protocol';
import UserContainer from '@data/use-cases/user/User.container';
import ConfigContainer from '@infra/config/Config.container';
import DataSourceContainer from '@infra/database/DataSource.container';
import EncryptatorContainer from '@infra/encryptator/Encryptator.container';
import IdGeneratorContainer from '@infra/id-generator/IdGenerator.container';
import PasswordValidatorContainer from '@infra/password-validator/PasswordValidator.container';
import UserControllerContainer from '@presentation/controllers/UserControllers.container';
import HttpApplication from '@presentation/http/HttpApplication';
import HttpApplicationContainer from '@presentation/http/HttpApplication.container';
import { container } from 'tsyringe';

export default class Bootstrap {
  static initDomainContainers(): void {
    UserContainer.inject()
  }

  static initInfraContainers(): void {
    ConfigContainer.inject()
    PasswordValidatorContainer.inject()
    EncryptatorContainer.inject()
    DataSourceContainer.inject()
    IdGeneratorContainer.inject()
  }

  static initPresentationContainers(): void {
    UserControllerContainer.inject()
  }

  static initHttpApplication(): void {
    HttpApplicationContainer.inject()

    const httpApplication: HttpApplication = HttpApplicationContainer.resolve<HttpApplication>('HttpApplication')

    httpApplication.initHttpApplication()
    httpApplication.initHttpMiddlewares()
  }

  static async initDataSources(): Promise<void> {
    const dataSource: IDataSourceProtocol = HttpApplicationContainer.resolve<IDataSourceProtocol>('DataSource')

    await dataSource.init()
  }

  static async initConfig(): Promise<void> {
    const config = container.resolve<IConfigProtocol>('ConfigProtocol')

    await config.init()
  }
}
