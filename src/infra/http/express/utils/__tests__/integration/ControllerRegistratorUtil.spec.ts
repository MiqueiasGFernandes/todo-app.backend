import { container } from 'tsyringe';
import ControllerRegistratorUtil from '../../ControllerRegistrator.util';

describe('ControllerRegistratorUtil (Integration)', () => {
  describe('GIVEN new controller is registered', () => {
    test('WHEN new controller is passed. SHOULD have __controller__ = true decorator, and it name at Dependency Injection Container', () => {
      class TestController {}

      ControllerRegistratorUtil.registerController(TestController as ObjectConstructor)
      const sut = Reflect.getMetadata('__controller__', TestController)

      expect(container.isRegistered('TestController')).toBe(true)
      expect(sut).toBe(true)
    });
  });
  describe('GIVEN register a new method information', () => {
    test('WHEN successfully. SHOULD get method information at controller scope', () => {
      const target: object = class TestController {
        foo() {
          return null
        }
      }

      ControllerRegistratorUtil.registerHttpMethodHandler(target as ObjectConstructor, 'foo', {
        httpMethodName: 'POST',
        path: '/foo',
      })

      const sut = Reflect.getMetadata('__http_methods_list__', target)
      expect(Array.isArray(sut)).toBe(true)
      expect(sut[0]).toHaveProperty('path', '/foo')
      expect(sut[0]).toHaveProperty('httpMethodName', 'POST')
      expect(sut[0]).toHaveProperty('classMethodName', 'foo')
    });
  });
});
