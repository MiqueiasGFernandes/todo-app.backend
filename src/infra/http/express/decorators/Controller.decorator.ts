import ControllersStorage from '@presentation/controller-storage/Controllers.storage'
import ControllerRegistratorUtil from '../utils/ControllerRegistrator.util'

const Controller = (): ClassDecorator => (target: Object) => {
  const targetAsConstructor = target as ObjectConstructor

  ControllerRegistratorUtil.registerController(targetAsConstructor)

  ControllersStorage.controllers[targetAsConstructor.name] = target
}

export default Controller
