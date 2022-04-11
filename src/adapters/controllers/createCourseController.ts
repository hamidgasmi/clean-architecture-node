import { Context } from 'koa'
import { route, POST, before } from 'awilix-koa'
import { Routes } from '../common/enums'
import { OperationType } from '../../application/common/enums'
import { CreateCourseUseCase } from '../../application/useCases/createCourseUseCase'
import { IControllersDeps } from '../common/IControllersDeps'
import { Middleware } from '../../infrastructure/middleware'
import { ICreateCourseIn } from '../../application/common/IUseCase'
import Joi from 'joi'

@route(Routes.ApiVersion + Routes.Courses)
export class CoursesController {
  protected readonly useCase: CreateCourseUseCase

  @route('')
  @POST()
  @before(Middleware.authorizer)
  async createCourse (ctx: Context): Promise<void> {

    const createCourseIn: ICreateCourseIn = {
      traceId: ctx.state.traceid,
      courseName: ctx.request.body.name,
      courseTopic: ctx.request.body.topic
    }

    const courseSchema = Joi.object().keys({
      traceId: Joi.string().required().trim().min(1),
      courseName: Joi.string().required().trim().min(1).required(),
      courseTopic: Joi.string().required().trim().min(1).required()
    })
    const validationResult = courseSchema.validate(createCourseIn)

    await this.useCase.execute(createCourseIn)
  }

  constructor (deps: IControllersDeps) {
    this.useCase = deps.useCaseFactory.getUseCase(OperationType.CREATE_COURSE) as CreateCourseUseCase
  }
}
