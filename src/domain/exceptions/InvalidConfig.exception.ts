export default class InvalidConfigException extends Error {
  constructor(message: string) {
    super(message);
    this.name = InvalidConfigException.name
    Error.captureStackTrace(this, InvalidConfigException)
  }
}
