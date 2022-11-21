export default class InternalUnknownException extends Error {
  constructor(message: string) {
    super(message);
    this.name = InternalUnknownException.name
    Error.captureStackTrace(this, InternalUnknownException)
  }
}
