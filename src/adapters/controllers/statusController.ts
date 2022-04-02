import { route, GET } from 'awilix-koa'
import { Context } from 'koa'
import { StatusCodes } from 'http-status-codes'
import { Routes } from '../common/enums'
import { cpus, freemem, platform, release, totalmem, uptime } from 'os'
import packageJSON = require('../../../package.json')

interface AppStatus {
  nodeVersion: string
  cpuModel: string
  freeMemory: number
  totalMemory: number
  platform: string
  release: string
  uptimeInSec: number
}

@route(Routes.StatusCheck)
export class StatusController {
  
  @route('/')
  @GET()
  async getStatus (ctx: Context): Promise<void> {
    ctx.body = this.getAppStatus()
    ctx.status = StatusCodes.OK
  }

  @route('/json')
  @GET()
  async getJsonStatus (ctx: Context): Promise<void> {
    ctx.body = this.getAppStatus()
    ctx.status = StatusCodes.OK
  }

  private getAppStatus(): AppStatus {
    return {
      nodeVersion: process.version,
      cpuModel: this.getCpuInfo(),
      freeMemory: freemem(),
      totalMemory: totalmem(),
      platform: platform(),
      release: release(),
      uptimeInSec: uptime()
    }
  }

  private getCpuInfo(): string {
    const cpuInfoList = cpus() 
    return (cpuInfoList && cpuInfoList.length) ? cpuInfoList[0].model : 'Unknown'
  }
}