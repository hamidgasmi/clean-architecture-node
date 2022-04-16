import { IUseCase, IUseCaseIn, IUseCaseOut } from './IUseCase'

export abstract class UseCaseBase implements IUseCase {
    protected readonly _service: unknown //todo

    abstract execute(input: IUseCaseIn): Promise<IUseCaseOut>

    constructor(dep: IUseCaseDeps) {
        // todo
    }
}

export interface IUseCaseDeps {
    //todo
}