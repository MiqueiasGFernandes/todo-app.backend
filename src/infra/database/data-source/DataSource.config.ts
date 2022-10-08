import IConfigProtocol from '@data/protocols/config/Config.protocol';
import DataSourceProviderException from '@domain/exceptions/DataSourceProvider.exception';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

@injectable()
export default class DataSourceConnection {
  private readonly config: IConfigProtocol

  constructor(@inject('ConfigProtocol') config: IConfigProtocol) {
    this.config = config;
  }

  connect(isConnected: boolean): Promise<DataSource> | null {
    if (!isConnected) {
      const host: string = this.config.getString('DB_HOST') as string
      const username: string = this.config.getString('DB_USERNAME') as string
      const password: string = this.config.getString('DB_PASSWORD') as string
      const database: string = this.config.getString('DB_NAME') as string
      const environment: string = this.config.getString('ENV') as string

      const srcDir: string = environment === 'production' ? 'build' : 'src'
      const extension: string = environment === 'production' ? 'js' : 'ts'

      return new DataSource({
        type: 'postgres',
        host,
        username,
        database,
        password,
        entities: [
          `${srcDir}/infra/database/entities/*.${extension}`,
        ],
        synchronize: true,
        logging: true,
      }).initialize().catch((error) => {
        throw new DataSourceProviderException(`Error initializing the datasource provider, see more details: ${(<Error>error).message}`);
      })
    }

    return null;
  }
}
