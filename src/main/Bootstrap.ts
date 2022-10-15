import 'reflect-metadata';

import IConfigProtocol from '@data/protocols/config/Config.protocol';
import UserContainer from '@data/use-cases/user/User.container';
import ConfigContainer from '@infra/config/Config.container';
import EncryptatorContainer from '@infra/encryptator/Encryptator.container';
import PasswordValidatorContainer from '@infra/password-validator/PasswordValidator.container';
import UserControllerContainer from '@presentation/controllers/UserControllers.container';
import HttpApplication from '@presentation/http/HttpApplication';
import HttpApplicationContainer from '@presentation/http/HttpApplication.container';
import { container } from 'tsyringe';
import { IDataSourceProtocol } from '@data/protocols/data-source/DataSource.protocol';
import DataSourceContainer from '@infra/database/DataSource.container';

export default class Bootstrap {
  static initDomainContainers(): void {
    UserContainer.inject()
  }

  static initInfraContainers(): void {
    ConfigContainer.inject()
    PasswordValidatorContainer.inject()
    EncryptatorContainer.inject()
    DataSourceContainer.inject()
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
