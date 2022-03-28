import { IUseCase } from '../interfaces/IUseCase'
import { IUseCaseIn } from '../interfaces/IUseCaseIn'
import { IUseCaseOut } from '../interfaces/IUseCaseOut'

export abstract class UseCaseBase implements IUseCase<IUseCaseIn, IUseCaseOut> {
    protected readonly _service: unknown //todo

    abstract execute(input: IUseCaseIn): Promise<IUseCaseOut>

    constructor(dep: IUseCaseDeps) {
        // todo
    }
}

export interface IUseCaseDeps { 
    //todo
}