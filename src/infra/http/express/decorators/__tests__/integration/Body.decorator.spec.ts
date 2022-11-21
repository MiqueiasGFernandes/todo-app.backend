import Body from '../../Body.decorator';
import Controller from '../../Controller.decorator';
import Post from '../../http-methods/Post.decorator';

describe('@Body()', () => {
  describe('GIVEN inject body at function parameter', () => {
    test('WHEN successfully. SHOULD have return map with function name and paramters lust by index', () => {
      @Controller()
      class MyController {
        @Post('/foo')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        foo(@Body() _baar: Record<string, unknown>) {
          return null
        }
      }

      const sut = Reflect.getMetadata('__http_route_params__', MyController.prototype)

      expect(sut).toHaveProperty('foo')
      expect(sut.foo).toHaveProperty('0', 'BODY')
    });
  });
});
