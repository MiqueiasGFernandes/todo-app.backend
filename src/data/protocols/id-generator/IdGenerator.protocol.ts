export interface IIdGeneratorProtocol {
  generate(): Promise<string>
}
