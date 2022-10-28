export interface IValidatorProtocol {
  validate(objectToValidate: object): Promise<string[] | null>
}
