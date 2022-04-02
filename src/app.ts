import Koa from 'koa'
import compress from 'koa-compress'
import koaBodyParser from 'koa-bodyparser'
import { AwilixContainer } from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa'
import { Middleware } from './infrastructure/middleware'
import { configureContainer } from './infrastructure/container'

import { Logger } from './infrastructure/logger'

export async function main (): Promise<string | void> {
    const logger = new Logger({})
    logger.info(`Starting clean-architecture-app server in environment ${process.env.envName}`)
    const port = process.env.PORT || 3000

    const app = new Koa()

    /* istanbul ignore next */
    let container: AwilixContainer
    try {
        container = configureContainer()
    } catch (e: unknown) {
        logger.error('Error registering container', e)
        throw e
    }

    const controllers = loadControllers('./adapters/controllers/*.[j|t]s', { cwd: __dirname, ignore: './adapters/controllers/[a-zA-Z0-9_]*.d.ts' })
    app
    .use(scopePerRequest(container))
    .use(Middleware.logger)
    //.use(errorHandler)
    .use(Middleware.validator)
    //.use(corsMiddleware)
    //.use(authenticator(jwtAuth, envSettings))
    .use(compress())
    .use(koaBodyParser())
    .use(controllers)

    /* istanbul ignore next */
    app.on('close', () => {
        logger.info('Server closing...')
    })

    /* istanbul ignore next */
    app.listen(port, () => {
        logger.info(`Listening on port: ${port}`);
    });

    /* istanbul ignore next */
    ['SIGINT', 'SIGTERM'].forEach(signal => process.on(signal as NodeJS.Signals, async () => {
        logger.info(`Caught ${signal}. Stopping container...`)
        // cleanups before?
        // ... Closing connexions? (DB, NATS, etc.)
        process.exit(1)
    }))

    return Promise.resolve(' Server is initialized!');
}
module.exports.runApp = main
require('make-runnable')