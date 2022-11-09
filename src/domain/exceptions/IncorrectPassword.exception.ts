export default class IncorrectPasswordException extends Error {
  constructor(message: string) {
    super(message);
    this.name = IncorrectPasswordException.name
    Error.captureStackTrace(this, IncorrectPasswordException)
  }
}
