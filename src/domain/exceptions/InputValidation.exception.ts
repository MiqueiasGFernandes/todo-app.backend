export default class InputValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = InputValidationException.name
    Error.captureStackTrace(this, InputValidationException)
  }
}
