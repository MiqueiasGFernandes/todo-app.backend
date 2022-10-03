export default class StronglessPasswordException extends Error {
  constructor(message: string) {
    super(message);
    this.name = StronglessPasswordException.name
    Error.captureStackTrace(this, StronglessPasswordException)
  }
}
