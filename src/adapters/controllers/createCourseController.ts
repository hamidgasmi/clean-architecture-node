import { Context } from 'koa'
import { route, POST, before } from 'awilix-koa'
import { Routes } from '../common/enums'
import { OperationType } from '../../application/common/enums'
import { CreateCourseUseCase } from '../../application/useCases/createCourseUseCase'
import { IControllersDeps } from '../common/IControllersDeps'
import { Middleware } from '../../infrastructure/middleware'
import { ICreateCourseIn } from '../../application/common/IUseCase'
import Joi from 'joi'
import { Name } from '../../domain/valueObjects/name'

@route(Routes.ApiVersion + Routes.Courses)
export class CoursesController {
  protected readonly useCase: CreateCourseUseCase

  @route('')
  @POST()
  @before(Middleware.authorizer)
  async createCourse (ctx: Context): Promise<void> {

    const traceId = ctx.state.traceid
    
    const courseNameResult = Name.create(ctx.request.body.name, 'name')
    if (courseNameResult.isFailure) {
      // todo: return http 400 code

    }

    const courseTopicNameResult = Name.create(ctx.request.body.topic, 'topic')
    if (courseNameResult.isFailure) {
      // todo: return http 400 code
    }

    await this.useCase.execute({ traceId, courseName: courseNameResult.value, courseTopicName: courseTopicNameResult.value })
  }

  constructor (deps: IControllersDeps) {
    this.useCase = deps.useCaseFactory.getUseCase(OperationType.CREATE_COURSE) as CreateCourseUseCase
  }
}
