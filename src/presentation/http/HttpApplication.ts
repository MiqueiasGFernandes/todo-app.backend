import IConfigProtocol from '@data/protocols/config/Config.protocol';
import UserRoutes from '@presentation/controllers/user/User.routes';
import express from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class HttpApplication {
  private readonly config: IConfigProtocol

  constructor(@inject('ConfigProtocol') config: IConfigProtocol) {
    this.config = config;
  }

  init(): void {
    const app = express();

    app.use('/', UserRoutes.register());

    const port: number = this.config.getNumber('APP_PORT') as number;

    app.listen(port)

    console.log(`Application started at port: ${port}`)
  }
}
