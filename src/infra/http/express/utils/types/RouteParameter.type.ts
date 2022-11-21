export type ParamType = 'BODY'

export type RouteParamType = {
  /**
   * Name from main method
   */
  methodName: string,
  /**
   * Index of parameter in order (starting at' 0' as first)
   */
  paramIndex: number,
  /**
   * Type of route param
   */
  paramType: ParamType
}
