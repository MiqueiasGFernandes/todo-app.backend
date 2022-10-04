import Validator from '@infra/input-validation/InputValidation';

export default function IsEmail() {
  return (target: any, key: string) => Validator.isEmail(target, key)
}
