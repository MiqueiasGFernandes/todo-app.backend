export default class InvalidTokenSignatureException extends Error {
  constructor(message: string) {
    super(message);
    this.name = InvalidTokenSignatureException.name
    Error.captureStackTrace(this, InvalidTokenSignatureException)
  }
}
