import { Result } from './result'

export interface IGuardArgument {
  argument: any
  argumentName: string
}

export type GuardArgumentCollection = IGuardArgument[]

/*
 * //todo: what if I use joi package here? 
 *     - Domain value-object / entity will depend on it? 
 *     - I should use Dependency Inversion Principle to not break clean architecture rule
**/
export class Guard {

  public static greaterThan (minValue: number, actualValue: number): Result<boolean> {
    return actualValue > minValue
      ? Result.success(true)
      : Result.failure(`Number given {${actualValue}} is not greater than {${minValue}}`)
  }

  public static againstAtLeast (numChars: number, text: string): Result<boolean> {
    return text.length >= numChars
      ? Result.success(true)
      : Result.failure(`Text is not at least ${numChars} chars.`)
  }

  public static againstAtMost (numChars: number, text: string): Result<boolean> {
    return text.length <= numChars
      ? Result.success(true)
      : Result.failure(`Text is greater than ${numChars} chars.`)
  }

  public static againstNullOrUndefined (argument: any, argumentName: string): Result<boolean> {
    return (argument === null || argument === undefined)
      ? Result.failure(`${argumentName} is null or undefined`)
      : Result.success(true)
  }
}