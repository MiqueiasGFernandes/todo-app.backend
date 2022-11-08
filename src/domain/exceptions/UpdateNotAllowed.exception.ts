export default class UpdateNotAllowedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = UpdateNotAllowedException.name
    Error.captureStackTrace(this, UpdateNotAllowedException)
  }
}
