import Validator from '@infra/input-validation/InputValidation';

export default function MinLength(length: number) {
  return (target: any, key: string) => Validator.minLength(target, key, length)
}
