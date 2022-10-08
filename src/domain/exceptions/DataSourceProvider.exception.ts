export default class DataSourceProviderException extends Error {
  constructor(message: string) {
    super(message);
    this.name = DataSourceProviderException.name
    Error.captureStackTrace(this, DataSourceProviderException)
  }
}
