export default interface IConfigProtocol {
  init(): void | Promise<void>
  getString(key: string): Promise<string> | string
  getBoolean(key: string): Promise<boolean> | boolean
  getArray<T = string | number>(key: string): Promise<Array<T>> | Array<T>
  getNumber(key: string): Promise<number> | number
}
