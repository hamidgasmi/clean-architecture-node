/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { Context } from 'koa'
import { StatusCodes } from 'http-status-codes'
import { ReadyController } from '../../../../src/adapters/controllers/readyController'

describe('Ready Controller Unit Test', function (this: any) {

  let context: Context
  let controller: ReadyController

  before(() => {
    context = {}  as unknown as Context
    controller = new ReadyController()
  })

  it('getReadyStatus', async () => {
    await controller.getReadyStatus(context)
    expect(context.status).to.equal(StatusCodes.OK)
  })
})
