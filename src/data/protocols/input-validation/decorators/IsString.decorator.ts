import Validator from '@infra/input-validation/InputValidation';

export default function isString() {
  return (target: any, key: string) => Validator.isString(target, key)
}
