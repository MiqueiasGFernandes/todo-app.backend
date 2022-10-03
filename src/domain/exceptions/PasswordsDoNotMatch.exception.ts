export default class PasswordsDoNotMatchException extends Error {
  constructor(message: string) {
    super(message);
    this.name = PasswordsDoNotMatchException.name
    Error.captureStackTrace(this, PasswordsDoNotMatchException)
  }
}
