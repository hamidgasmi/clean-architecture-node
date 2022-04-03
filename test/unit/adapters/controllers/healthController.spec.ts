/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { Context } from 'koa'
import { StatusCodes } from 'http-status-codes'
import { HealthController } from '../../../../src/adapters/controllers/healthController'

describe('Health Controller Unit Test', function (this: any) {

  let context: Context
  let controller: HealthController

  before(() => {
    context = {} as unknown as Context
    controller = new HealthController()
  })

  it('getHealth', async () => {
    await controller.getHealth(context)
    expect(context.status).to.equal(StatusCodes.OK)
  })

})
