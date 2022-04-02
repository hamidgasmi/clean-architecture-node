import { asValue } from 'awilix'
import { Context, Next } from 'koa'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { Headers } from './enums'
import { Logger } from './logger'


export class Middleware {

    static async logger(ctx: Context, next: Next): Promise<void> {

        const logger = new Logger({ traceId: ctx.state.traceid })
        ctx.state.container.register({ logger: asValue(logger) })
        await next()

    }

    static async validator(ctx: Context, next: Next): Promise<void> {
        // todo: bypass validation for Preflight request, status and health check 
        if (!ctx.request.get(Headers.TraceId)) {
            // todo: use ErrorPresenter instead
            ctx.throw(StatusCodes.BAD_REQUEST, getReasonPhrase(StatusCodes.BAD_REQUEST), { developerMessage: `${Headers.TraceId} header is missing`})
        }
        
        ctx.state.traceid = ctx.request.get(Headers.TraceId)
        await next()
    }
}