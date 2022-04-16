import Joi from 'joi'
import { Result } from './result'

export interface IGuardArgument<T> {
  value: T
  name: string
}

export type IGuardArguments<T> = IGuardArgument<T>[]

/*
 * //todo: what if I use joi package here? 
 *     - Domain value-object / entity will depend on it? 
 *     - I should use Dependency Inversion Principle to not break clean architecture rule
**/
export class Guard {

  public static greaterThan (argument: IGuardArgument<number>, minValue: number): Result<boolean> {
    return argument.value > minValue
      ? Result.success(true)
      : Result.failure(`${argument.name} given {${argument.value}} is not greater than {${minValue}}`)
  }

  public static againstNullOrUndefined (argument: IGuardArgument<any>): Result<boolean> {
    return argument.value
      ? Result.success(true)
      : Result.failure(`${argument.value} is null or undefined`)
  }

  public static againstAtLeast (argument: IGuardArgument<string>, numChars: number): Result<string> {
    
    const againstNullOrUndefinedResult = Guard.againstNullOrUndefined(argument)
    if (againstNullOrUndefinedResult.isFailure) {
      return Result.failure(againstNullOrUndefinedResult.error)
    }

    const value = argument.value
      ? argument.value.trim()
      : ''

    return value.length >= numChars
      ? Result.success(value)
      : Result.failure(`${argument.name} is not at least ${numChars} chars.`)
  }

  public static againstAtMost (argument: IGuardArgument<string>, numChars: number): Result<string> {

    const value = argument.value
      ? argument.value.trim()
      : ''

    return value.length <= numChars
      ? Result.success(value)
      : Result.failure(`${argument.name} is greater than ${numChars} chars.`)
  }

  // ! is Joi worth it for this type of validation?
  public static againstAtMostJoi (argument: IGuardArgument<string>, numChars: number): Result<string> {
    
    const validationResult: Joi.ValidationResult<string> = Joi.string().required().trim().max(numChars).validate(argument.value)
    if (validationResult.value) {
      return Result.success(validationResult.value)
    }
    else {
      return validationResult.error
        ? Result.failure(validationResult.error.message)
        : Result.failure(`${argument.name} is not valid.`)
    }
  }
}