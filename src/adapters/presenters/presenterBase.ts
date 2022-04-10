import { Context } from 'koa'
import { IPresenter } from '../common/IPresenter'
import { IUseCaseOut } from '../../application/common/IUseCase'

export abstract class PresenterBase implements IPresenter {
  protected _errorPresenter: IPresenter

  abstract presentResults(ctx: Context, model: IUseCaseOut): void

  present(ctx: Context, model: IUseCaseOut): void {

    this._errorPresenter.present(ctx, model)
    if (ctx.body) {
      return
    }

    this.presentResults(ctx, model)
  }

  constructor({ errorPresenter }: { errorPresenter: IPresenter }) {
    this._errorPresenter = errorPresenter
  }
}
