export default class InvalidLoginCredentials extends Error {
  constructor(message: string) {
    super(message);
    this.name = InvalidLoginCredentials.name
    Error.captureStackTrace(this, InvalidLoginCredentials)
  }
}
