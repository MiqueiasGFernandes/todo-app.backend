export default class ConfigurationProviderInitException extends Error {
  constructor(message: string) {
    super(message);
    this.name = ConfigurationProviderInitException.name
    Error.captureStackTrace(this, ConfigurationProviderInitException)
  }
}
