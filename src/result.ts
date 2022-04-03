export class Result<T> {
    static success<U>(value: U): Result<U> {
      return new Result(value, undefined)
    }

    static failure<U>(error: string): Result<U> {
      return new Result<U>(undefined, error)
    }
     private readonly _value: T | undefined
    private readonly _error: string | undefined

    private constructor(value: T | undefined, error: string | undefined) {
      this._value = value
      this._error = error
    }

    get isFailure(): boolean {
      return !this.isSuccess
    }

    get isSuccess(): boolean {
      return this._error === undefined
    }

    get error(): string {
      if (this.isSuccess) {
        throw new Error(
          'Invalid Operation. Success result does not have an error.'
        )
      }

      return this._error!
    }

    get value(): T {
      if (this.isFailure) {
        throw new Error(
          'Invalid Operation. Failure result does not have a value.'
        )
      }

      return this._value!
    }
  }
  