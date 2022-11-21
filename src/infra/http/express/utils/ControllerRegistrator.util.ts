import { container } from 'tsyringe'
import { ControllerHttpMethodInformationType } from './types/ControllerHttpMethodInformation.type'

type HttpMethodHandler = {
  path: string,
  httpMethodName: string,
  classMethodName: string
}

export default class ControllerRegistratorUtil {
  /**
   * Register a controller into Dependency Injection Framework and add to it "__controller__" mark
   * decorator
   * @param controllerClass - Controller Class Target
   */
  static registerController(controllerClass: ObjectConstructor): void {
    Reflect.defineMetadata('__controller__', true, controllerClass)

    container.register(controllerClass.name, { useValue: controllerClass })
  }

  /**
   * Receive a HTTP method handler and register it information at controller scope
   * @param controllerClass {ObjectConstructor} - Controller Class Target
   * @param classMethodName {string} - Name of method which will be registered
   * @param methodInformation {ControllerHttpMethodInformationType} Method information type
   */
  static registerHttpMethodHandler(
    controllerClass: ObjectConstructor,
    classMethodName: string,
    methodInformation: ControllerHttpMethodInformationType,
  ): void {
    const httpMethodsListName = '__http_methods_list__'

    const previousHttpMethodHandlersList: HttpMethodHandler[] = Reflect.getMetadata(
      httpMethodsListName,
      controllerClass,
    ) || []

    previousHttpMethodHandlersList.push({
      classMethodName,
      httpMethodName: methodInformation.httpMethodName as string,
      path: methodInformation.path as string,
    })

    Reflect.defineMetadata(httpMethodsListName, previousHttpMethodHandlersList, controllerClass)
  }
}
