import { route, GET } from 'awilix-koa'
import { Context } from 'koa'
import { StatusCodes } from 'http-status-codes'
import { Routes } from '../common/enums'

@route(Routes.ReadyCheck)
export class ReadyController {
  @route('')
  @GET()
  async getReadyStatus (ctx: Context): Promise<void> {
    ctx.status = StatusCodes.OK
  }
}