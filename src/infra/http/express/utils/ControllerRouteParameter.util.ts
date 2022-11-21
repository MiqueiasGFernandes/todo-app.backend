import { ParamType } from './types/RouteParameter.type';

export default class ControllerRouteParameterUtil {
  /**
   * Register a route param that will receives a injected value by express
   * @param target {ObjectConstructor} - Controller target
   * @param methodName {string} - Name of method which will have parameter registered
   * @param paramIndex {number} - Index number of function parameter
   * @param paramType {ParamType} - Value of type param which will be injected
   */
  static addRouterParameter(
    target: ObjectConstructor,
    methodName: string,
    paramIndex: number,
    paramType: ParamType,
  ): void {
    const previousRouteParams: Record<string, unknown> = Reflect.getMetadata(
      methodName,
      target,
    ) || {}

    previousRouteParams[methodName] = (previousRouteParams[methodName]) ? {
      ...previousRouteParams[methodName] as object,
      [paramIndex]: paramType,
    } : {
      [paramIndex]: paramType,
    }

    Reflect.defineMetadata('__http_route_params__', previousRouteParams, target)
  }
}
