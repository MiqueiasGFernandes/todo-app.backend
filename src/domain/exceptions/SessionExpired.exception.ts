export default class SessionExpiredException extends Error {
  constructor(message: string) {
    super(message);
    this.name = SessionExpiredException.name
    Error.captureStackTrace(this, SessionExpiredException)
  }
}
