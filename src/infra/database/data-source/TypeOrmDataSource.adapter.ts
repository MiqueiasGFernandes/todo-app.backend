import IConfigProtocol from '@data/protocols/config/Config.protocol';
import { IDataSourceProtocol } from '@data/protocols/data-source/DataSource.protocol';
import DataSourceProviderException from '@domain/exceptions/DataSourceProvider.exception';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

@injectable()
export default class TypeOrmDataSourceAdapter implements IDataSourceProtocol {
  private readonly config: IConfigProtocol

  constructor(@inject('ConfigProtocol') config: IConfigProtocol) {
    this.config = config;
  }

  async init(): Promise<void> {
    const host: string = this.config.getString('DB_HOST') as string
    const port: number = this.config.getNumber('DB_PORT') as number
    const username: string = this.config.getString('DB_USERNAME') as string
    const password: string = this.config.getString('DB_PASSWORD') as string
    const database: string = this.config.getString('DB_NAME') as string
    const environment: string = this.config.getString('ENV') as string
    const logging: boolean = this.config.getBoolean('DB_LOG') as boolean

    const srcDir: string = environment === 'production' ? 'build' : 'src'
    const extension: string = environment === 'production' ? 'js' : 'ts'
    const synchronize: boolean = environment !== 'production'

    const dataSource = new DataSource({
      type: 'postgres',
      host,
      username,
      port,
      database,
      password,
      entities: [
        `${srcDir}/infra/database/entities/*.${extension}`,
      ],
      synchronize,
      logging,
    })

    await dataSource
      .initialize()
      .catch((error) => {
        throw new DataSourceProviderException(`Error initializing the datasource provider, see more details: ${(<Error>error).message}`);
      }).then(() => {
        console.log(`Typeorm connected to the database: ${host}:${port}`)
        console.log(logging ? 'Database query logging enabled' : 'Database query logging disabled')
      })
  }
}
