import { Context } from 'koa'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { IPresenter } from '../common/IPresenter'
import { IUseCaseOut } from '../../application/common/IUseCase'

interface ErrorResponse {
  status: StatusCodes,
  message: string,
  developerMessage: string,
  errorId: string
}

export class ErrorPresenter implements IPresenter {

  present(ctx: Context, model: IUseCaseOut): void {

    const errorResponse = this._getErrorResponse(ctx.state.vctraceid, model)
    if (errorResponse) {
      ctx.status = errorResponse.status

      ctx.body = errorResponse
    }
  }

  private _getErrorResponse(errorId: string, model: IUseCaseOut): ErrorResponse | undefined {
    let developerMessage: string = ''
    let status: StatusCodes | undefined = undefined

    if (model.inputError) {
        status = StatusCodes.BAD_REQUEST
        developerMessage = model.inputError
    }
    else if (model.notFoundError) {
        status = StatusCodes.NOT_FOUND
        developerMessage = model.notFoundError
    }
    else if (model.authZError) {
        status = StatusCodes.FORBIDDEN
        developerMessage = 'User permissions denied'
    }
    else if (model.authNError) {
        status = StatusCodes.UNAUTHORIZED
        developerMessage = 'Unauthorized'
    }
    else if (model.saveError || model.unknownError) {
        status = StatusCodes.INTERNAL_SERVER_ERROR
        developerMessage = 'Unable to process your request at this time. Please try again later.'
    }

    return status ? { status, message: getReasonPhrase(status), developerMessage, errorId } : undefined
  }
}
