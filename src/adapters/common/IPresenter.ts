import { Context } from 'koa'
import { IUseCaseOut } from '../../application/common/IUseCase'

export interface IPresenter {
    present(ctx: Context, model: IUseCaseOut): void
}
