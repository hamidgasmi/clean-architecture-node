import { IUseCase } from './IUseCase'
import { OperationType } from './enums'
import { IUseCaseDeps } from './useCaseBase'
import { CreateCourseUseCase } from '../useCases/createCourseUseCase'

export interface IUseCaseFactory {
    getUseCase (projectActionType: OperationType): IUseCase
}

export class UseCaseFactory implements IUseCaseFactory {
    private dependencies: IUseCaseDeps

    constructor (deps: IUseCaseDeps) {
        this.dependencies = deps
    }

    public getUseCase (projectActionType: OperationType): IUseCase {
    switch (projectActionType) {
        case OperationType.CREATE_COURSE:
            return new CreateCourseUseCase(this.dependencies)

      default:
        return new CreateCourseUseCase(this.dependencies)
    }
  }
}
