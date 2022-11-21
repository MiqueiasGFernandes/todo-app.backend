import Controller from '../../Controller.decorator';
import Post from '../../http-methods/Post.decorator';

describe('@Controller()', () => {
  describe('GIVEN making new controller', () => {
    test('WHEN successfully. SHOULD returns metadata with controller information', () => {
      @Controller()
      class MyController {
        @Post('/foo')
        foo() {
          return null
        }
      }

      const isController = Reflect.getMetadata('__controller__', MyController)
      const httpMethodsList = Reflect.getMetadata('__http_methods_list__', MyController.prototype)

      expect(isController).toBe(true)
      expect(Array.isArray(httpMethodsList)).toBe(true)
      expect(httpMethodsList[0]).toHaveProperty('path', '/foo')
      expect(httpMethodsList[0]).toHaveProperty('httpMethodName', 'POST')
      expect(httpMethodsList[0]).toHaveProperty('classMethodName', 'foo')
    });
  });
});
