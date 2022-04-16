import { ValueObject } from '../../shared/domain/valueObject'
import { Result } from '../../shared/core/result'


export interface EmailProps {
  value: string
}

export class Email extends ValueObject<EmailProps> {
  
  get value () : string {
    return this.props.value
  }

  private constructor (props: EmailProps) {
    super(props)
  }

  private static isValidEmail (email: string) {
    /**
     * todo: why didn't we specify any letter in the local part?
    **/
    var emailRe = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRe.test(email)
  }

  private static format (email: string): string {
    return email.trim().toLowerCase()
  }

  public static create (email: string): Result<Email> {
    return Email.isValidEmail(email)
      ? Result.success<Email>(new Email({ value: this.format(email) }))
      : Result.failure<Email>('Email address not valid')
  }
}