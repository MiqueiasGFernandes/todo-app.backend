import HttpMethodNamesConstant from '../../constants/HttpMethodNames.constant'
import ControllerRegistratorUtil from '../../utils/ControllerRegistrator.util'

const Post = (path: string): MethodDecorator => (target: object, methodName: string| symbol) => {
  ControllerRegistratorUtil.registerHttpMethodHandler(
    target as ObjectConstructor,
    methodName as string,
    {
      httpMethodName: HttpMethodNamesConstant.POST,
      path,
    },
  )
}

export default Post
