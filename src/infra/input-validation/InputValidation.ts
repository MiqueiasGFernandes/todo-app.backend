import InputValidationException from '@domain/exceptions/InputValidation.exception'

function required(target: any, key: string) {
  Object.defineProperty(target, key, {
    set(newValue) {
      if (newValue === undefined || newValue === null) {
        throw new InputValidationException(`The ${key} is required`)
      }
    },
  })
}

function isString(target: any, key: string) {
  Object.defineProperty(target, key, {
    set(newValue) {
      if (typeof newValue !== 'string') {
        throw new InputValidationException(`The ${key} must be a string`)
      }
    },
  })
}

function isEmail(target: any, key: string) {
  const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

  Object.defineProperty(target, key, {
    set(newValue: string) {
      if (emailPattern.test(newValue)) {
        throw new InputValidationException(`The ${key} must be a string`)
      }
    },
  })
}

function maxLength(target: any, key: string, length: number) {
  Object.defineProperty(target, key, {
    set(newValue: string) {
      if (newValue.length < length) {
        throw new InputValidationException(`The ${key} must have maximum ${length} characters`)
      }
    },
  })
}

function minLength(target: any, key: string, length: number) {
  Object.defineProperty(target, key, {
    set(newValue: string) {
      if (newValue.length > length) {
        throw new InputValidationException(`The ${key} must more than ${length} characters`)
      }
    },
  })
}

const Validator = {
  required,
  isString,
  isEmail,
  maxLength,
  minLength,
}

export default Validator
