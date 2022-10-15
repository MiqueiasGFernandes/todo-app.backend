import IConfigProtocol from '@data/protocols/config/Config.protocol';
import UserRoutes from '@presentation/controllers/user/User.routes';
import { inject, injectable } from 'tsyringe';
import timeoutMiddleware from 'connect-timeout';
import express from 'express';

@injectable()
export default class HttpApplication {
  private readonly config: IConfigProtocol

  private expressApp: express.Express = express();

  constructor(@inject('ConfigProtocol') config: IConfigProtocol) {
    this.config = config;
  }

  initHttpApplication(): void {
    this.expressApp.use(timeoutMiddleware('5s'))
    this.expressApp.use(express.json())

    this.expressApp.use('/', UserRoutes.register());

    const port: number = this.config.getNumber('APP_PORT') as number;

    this.expressApp.listen(port)

    console.log(`Application started at port: ${port}`)
  }

  initHttpMiddlewares(): void {
    this.expressApp.use(express.urlencoded({
      extended: true,
    }))
    this.expressApp.use(express.json())
  }
}
