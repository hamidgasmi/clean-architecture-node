/* eslint-disable @typescript-eslint/no-explicit-any */
import os from 'os'
import sinon from 'sinon'
import { expect } from 'chai'
import { Context } from 'koa'
import itParam from 'mocha-param'
import { StatusCodes } from 'http-status-codes'
import { StatusController } from '../../../../src/adapters/controllers/statusController'

describe('Status Controller Unit Test', function (this: any) {
  const uptimeInSec = 2240
  const freeMemory = 536870912
  const totalMemory = 1073741824
  const platform = 'win32'
  const release = '10.0.22000'
  const cpuModel = 'Intel Core'
  const nodeVersion = 'v16.14.0'
  const sandbox = sinon.createSandbox()
  let context: Context
  let controller: StatusController
  let osUptimeStub: sinon.SinonStub<[], number>
  let osReleaseStub: sinon.SinonStub<[], string>
  let osFreememStub: sinon.SinonStub<[], number>
  let osTotalmemStub: sinon.SinonStub<[], number>
  let osPlatformStub: sinon.SinonStub<[], string>
  let osCpuStub: sinon.SinonStub<[], os.CpuInfo[]>

  beforeEach(() => {
    context = { status: '', body: {} } as unknown as Context
    controller = new StatusController()

    osCpuStub = sandbox.stub(os, 'cpus')
    osUptimeStub = sandbox.stub(os, 'uptime')
    osReleaseStub = sandbox.stub(os, 'release')
    osFreememStub = sandbox.stub(os, 'freemem')
    osTotalmemStub = sandbox.stub(os, 'totalmem')
    osPlatformStub = sandbox.stub(os, 'platform')

    osReleaseStub.returns(release)
    osPlatformStub.returns(platform)
    osUptimeStub.returns(uptimeInSec)
    osFreememStub.returns(freeMemory)
    osTotalmemStub.returns(totalMemory)
    osCpuStub.returns([ { model: cpuModel } as unknown as os.CpuInfo])
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('getStatus should return HTTP status StatusCodes.OK', async () => {
    await controller.getStatus(context)
    expect(context.status).to.equal(StatusCodes.OK)
    expect(context.body).to.deep.eq({ nodeVersion, cpuModel, freeMemory, totalMemory, platform, release, uptimeInSec})
  })

  it('getJsonStatus should return HTTP status StatusCodes.OK', async () => {
    await controller.getJsonStatus(context)
    expect(context.status).to.equal(StatusCodes.OK)
    expect(context.body).to.deep.eq({ nodeVersion, cpuModel, freeMemory, totalMemory, platform, release, uptimeInSec})
  })

  itParam('should return unknown cpu when no cpu is set and ${value.caseDescription}', [
    { caseDescription: 'os.cpus() returns undefined', cpuInfoList: undefined },
    { caseDescription: 'os.cpus() returns empty list', cpuInfoList: [] }
  ], async (testCase: { caseDescription: string, cpuInfoList: os.CpuInfo[] | undefined }) => {
    osCpuStub.returns(testCase.cpuInfoList as os.CpuInfo[])
    await controller.getStatus(context)
    expect(context.body).to.deep.eq({ cpuModel: 'Unknown', nodeVersion, freeMemory, totalMemory, platform, release, uptimeInSec})
  })
})