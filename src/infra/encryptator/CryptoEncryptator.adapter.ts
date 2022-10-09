import { IEncryptatorProtocol } from '@data/protocols/encryptator/Encryptator.protocol';

import CryptoJS from 'crypto-js';

export default class CryptoEncryptatorAdapter implements IEncryptatorProtocol {
  async crypt(text: string): Promise<string> {
    return Promise.resolve<string>(CryptoJS.SHA512(text).toString(CryptoJS.enc.Base64))
  }
}
