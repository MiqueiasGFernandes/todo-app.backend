import InputValidationException from '@domain/exceptions/InputValidation.exception'

function required(target: any, key: string) {
  let value: unknown = target[key]

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get() {
      return value
    },
    set(newValue) {
      if (newValue === undefined || newValue === null) {
        throw new InputValidationException(`The ${key} is required`)
      }
      value = newValue
    },
  })
}

function isString(target: any, key: string) {
  const value = target[key]

  if (typeof value !== 'string' && value !== undefined) {
    throw new InputValidationException(`The ${key} must be a string`)
  }
}

function isEmail(target: any, key: string) {
  const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
  const value: string = target[key]

  if (emailPattern.test(value)) {
    throw new InputValidationException(`The ${key} must be a string`)
  }
}

function maxLength(target: any, key: string, length: number) {
  const value: string = target[key]

  if (value && value.length < length) {
    throw new InputValidationException(`The ${key} must have maximum ${length} characters`)
  }
}

function minLength(target: any, key: string, length: number) {
  const value: string = target[key]

  if (value && value.length > length) {
    throw new InputValidationException(`The ${key} must more than ${length} characters`)
  }
}

const Validator = {
  required,
  isString,
  isEmail,
  maxLength,
  minLength,
}

export default Validator
