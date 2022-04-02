import { route, GET } from 'awilix-koa'
import { Context } from 'koa'
import { StatusCodes } from 'http-status-codes'
import { Routes } from '../common/enums'

@route(Routes.HealthCheck)
export class HealthController {
  @route('/')
  @GET()
  async getHealth (ctx: Context): Promise<void> {
    ctx.status = StatusCodes.OK
  }
}