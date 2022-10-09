export interface IEncryptatorProtocol {
  crypt(text: string): Promise<string>,
}
