import { UseCaseBase } from '../common/useCaseBase'
import { IUseCase, CreateCourseResult, ICreateCourseIn, IUseCaseOut } from '../common/IUseCase'
import { Result } from '../../result'

export class CreateCourseUseCase extends UseCaseBase implements IUseCase {
    
    async execute(input: ICreateCourseIn): Promise<IUseCaseOut> {
        //todo:
        return { unknownError: 'method is not yet implemented' }
    }
}
