export default class ControllerInformationUtil {
  /**
   * Get all controller method names
   * @param controllerClass  - Controller Class Target
   * @returns {string[]} List of methods from Controller class
   */
  static getAllMethods(controllerClass: any): string[] {
    return Reflect.ownKeys(controllerClass.prototype as object).filter((methodName) => methodName !== 'constructor') as string[]
  }
}
