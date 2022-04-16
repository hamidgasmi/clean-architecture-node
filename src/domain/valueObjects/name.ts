
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

  public static create (props: NameProps, attributeName: string): Result<Name> {

    const name = attributeName

    const minLengthResult = Guard.againstAtLeast({ value: props.name, name }, Name.minLength)
    if (minLengthResult.isFailure) {
      return Result.failure<Name>(minLengthResult.error)
    }

    const maxLengthResult = Guard.againstAtMost({ value: minLengthResult.value, name }, Name.maxLength)
    if (maxLengthResult.isFailure) {
      return Result.failure<Name>(minLengthResult.error)
    }

    return Result.success<Name>(new Name({ name: maxLengthResult.value }))
  }
}