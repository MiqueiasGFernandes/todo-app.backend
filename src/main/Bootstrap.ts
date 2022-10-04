import IConfigProtocol from '@data/protocols/config/Config.protocol';
import UserContainer from '@data/use-cases/user/User.container';
import ConfigContainer from '@infra/config/Config.container';
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
  }

  static initPresentationContainers(): void {
    UserControllerContainer.inject()
    HttpApplicationContainer.inject()
  }

  static initHttpApplication(): void {
    const httpApplication: HttpApplication = HttpApplicationContainer.resolve<HttpApplication>('HttpApplication')

    httpApplication.init()
  }

  static async initConfig(): Promise<void> {
    const config = container.resolve<IConfigProtocol>('IConfigProtocol')

    await config.init()
  }
}
