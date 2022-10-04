import Validator from '@infra/input-validation/InputValidation';

export default function Required() {
  return (target: any, key: string) => Validator.required(target, key)
}
