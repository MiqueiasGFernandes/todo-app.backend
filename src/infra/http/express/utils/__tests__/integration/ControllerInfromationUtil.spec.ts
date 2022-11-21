import HttpMethodNamesConstant from '@infra/http/express/constants/HttpMethodNames.constant';
import ControllerInformationUtil from '../../ControllerInformation.util';

describe('ControllerInformationUtil (Integration)', () => {
  describe('GIVEN pass a controller class to helper "get methods" function', () => {
    test('WHEN successfully. SHOULD returns a class methods list', () => {
      class TestController {
        private someService: any

        constructor(someService: any) {
          this.someService = someService
        }

        foo() {
          return null
        }
      }

      const sut = ControllerInformationUtil.getAllMethods(TestController)

      expect(sut).toEqual(['foo'])
    });
  });
});
