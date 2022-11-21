import ControllerRouteParameterUtil from '../utils/ControllerRouteParameter.util'

const Body = (): ParameterDecorator => (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
) => {
  ControllerRouteParameterUtil.addRouterParameter(
    target as ObjectConstructor,
    propertyKey as string,
    parameterIndex,
    'BODY',
  )
}

export default Body
