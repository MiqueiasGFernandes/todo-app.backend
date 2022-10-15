import { IIdGeneratorProtocol } from '@data/protocols/id-generator/IdGenerator.protocol';
import { injectable } from 'tsyringe';
import { v4 } from 'uuid';

@injectable()
export default class UuidGeneratorAdapter implements IIdGeneratorProtocol {
  async generate(): Promise<string> {
    return Promise.resolve(v4())
  }
}
