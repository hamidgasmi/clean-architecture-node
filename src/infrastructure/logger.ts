import { v4 as uuid } from 'uuid'

//todo: create a real class/client. This is a mocked class
export class Logger {
    private readonly traceId: string

    public async info(message: string): Promise<void> {
        console.log({
            level: 'INFO',
            traceId: this.traceId,
            message: message
        })
    }

    public async error(message: string, error: unknown): Promise<void> {
        console.log({
            level: 'ERROR',
            traceId: this.traceId,
            message: message,
            error: JSON.stringify(error)
        })
    }

    constructor (deps: { traceId?: string }) {
        this.traceId = deps.traceId || uuid()
    }
}