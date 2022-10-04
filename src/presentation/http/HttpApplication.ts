import IConfigProtocol from '@data/protocols/config/Config.protocol';
import UserRoutes from '@presentation/controllers/user/User.routes';
import express from 'express';
import { injectable } from 'tsyringe';

@injectable()
export default class HttpApplication {
  private readonly config: IConfigProtocol

  constructor(config: IConfigProtocol) {
    this.config = config;
  }

  init(): void {
    const app = express();

    app.use('/', UserRoutes.register());

    app.listen(this.config.getString('APP_PORT'))
  }
}
