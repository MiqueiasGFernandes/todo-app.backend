import Validator from '@infra/input-validation/InputValidation';

export default function MaxLength(length: number) {
  return (target: any, key: string) => Validator.maxLength(target, key, length)
}
