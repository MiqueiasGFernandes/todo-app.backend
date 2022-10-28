import { IValidatorProtocol } from '@data/protocols/validator/Validator.protocol';
import { validate } from 'class-validator';

export default class ClassValidatorAdapter implements IValidatorProtocol {
  async validate(objectToValidate: object): Promise<string[] | null> {
    const errors = await validate(objectToValidate)

    if (errors.length > 0) {
      let validationErrorsByConstraints: string[] = []

      errors.forEach((error) => {
        const constraintsValues: string[] = Object.values(error.constraints || {})

        validationErrorsByConstraints = [
          ...validationErrorsByConstraints,
          ...constraintsValues,
        ]
      })

      return Promise.reject(validationErrorsByConstraints)
    }

    return Promise.resolve(null)
  }
}
