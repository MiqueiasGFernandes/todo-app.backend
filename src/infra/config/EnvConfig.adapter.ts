import dotenv from 'dotenv';

import IConfigProtocol from '@data/protocols/config/Config.protocol';
import InvalidConfigException from '@domain/exceptions/InvalidConfig.exception';
import { injectable } from 'tsyringe';
import ConfigurationProviderInitException from '@domain/exceptions/ConfigurationProviderInit.exception';

@injectable()
export default class EnvConfigAdapter implements IConfigProtocol {
  init(): void {
    const { error } = dotenv.config({
      path: `${__dirname}/../../../config/environment/.env`,
    })

    if (error) {
      throw new ConfigurationProviderInitException(`
        An error has ocurrs loading configuration provider. Follow the details and try to change provider: '${error.message}'
      `)
    }
  }

  getString(key: string): string {
    const value = process.env[key]

    if (!value) {
      throw new InvalidConfigException(`Config with key '${key}' does not exists`)
    }

    return String(value)
  }

  getBoolean(key: string): boolean {
    const value = process.env[key]

    if (!value) {
      throw new InvalidConfigException(`Config with key '${key}' does not exists`)
    }

    return value === 'true'
  }

  getArray<T = string | number>(key: string): T[] {
    const value = process.env[key]

    if (!value) {
      throw new InvalidConfigException(`Config with key '${key}' does not exists`)
    }

    return value.split(',') as T[]
  }

  getNumber(key: string): number {
    const value = process.env[key]

    if (!value) {
      throw new InvalidConfigException(`Config with key '${key}' does not exists`)
    }

    return Number(value)
  }
}
