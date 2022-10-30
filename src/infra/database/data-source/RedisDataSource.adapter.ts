import IConfigProtocol from '@data/protocols/config/Config.protocol';
import { IDataSourceProtocol } from '@data/protocols/data-source/DataSource.protocol';
import { createClient } from 'redis';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class RedisDataSourceAdapter implements IDataSourceProtocol {
  private readonly config: IConfigProtocol

  public static client: ReturnType<typeof createClient>;

  constructor(
    @inject('ConfigProtocol') config: IConfigProtocol,
  ) {
    this.config = config
  }

  async init(): Promise<void> {
    const url: string = this.config.getString('REDIS_URL') as string
    const database: number = this.config.getNumber('REDIS_DB') as number

    const client = createClient({
      url,
      database,
      name: 'todo',
    })

    client.on('error', (error) => Promise.reject(error))

    await client.connect().catch((error) => Promise.reject(error))

    RedisDataSourceAdapter.client = client
  }
}
