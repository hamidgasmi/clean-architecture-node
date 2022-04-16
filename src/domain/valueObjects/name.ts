
import { Result } from '../../shared/core/result'
import { ValueObject } from '../../shared/domain/valueObject'
import { Guard } from '../../shared/core/guard'

export interface NameProps {
  name: string 
}

export class Name extends ValueObject<NameProps> {
  public static readonly minLength: number = 2
  public static readonly maxLength: number = 255

  get value (): string {
    return this.props.name
  }

  private constructor (props: NameProps) {
    super(props)
  }

  public static create (props: NameProps): Result<Name> {
    const nameResult = Guard.againstNullOrUndefined(props.name, 'username')
    if (nameResult.isFailure) {
      return Result.failure<Name>(nameResult.error)
    }

    const minLengthResult = Guard.againstAtLeast(Name.minLength, props.name)
    if (minLengthResult.isFailure) {
      return Result.failure<Name>(minLengthResult.error)
    }

    const maxLengthResult = Guard.againstAtMost(Name.maxLength, props.name)
    if (maxLengthResult.isFailure) {
      return Result.failure<Name>(minLengthResult.error)
    }

    return Result.success<Name>(new Name(props))
  }
}