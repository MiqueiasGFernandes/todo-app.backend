export default class UserAlreadyExistsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = UserAlreadyExistsException.name
    Error.captureStackTrace(this, UserAlreadyExistsException)
  }
}
