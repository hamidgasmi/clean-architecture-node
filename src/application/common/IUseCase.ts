export interface IUseCase {
    execute(input: IUseCaseIn): Promise<IUseCaseOut>
}

export interface IUseCaseIn {
    traceId: string
}

export interface IUseCaseOut {
    saveError?: string
    inputError?: string
    authZError?: string
    authNError?: string
    unknownError?: string
    notFoundError?: string
    result?: IUseCaseResult
}

export interface ICreateCourseIn extends IUseCaseIn {
    courseName: string,
    courseTopic: string
}

export interface IUseCaseResult {}

export interface CreateCourseResult extends IUseCaseResult {
    courseName: string,
    courseTopic: string
}
