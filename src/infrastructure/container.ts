import { createContainer, AwilixContainer, asValue, asClass } from 'awilix'
import { UseCaseFactory } from '../application/common/useCasesFactory'

export function configureContainer (): AwilixContainer {
  return createContainer()
    .register({
      useCaseFactory: asClass(UseCaseFactory).scoped()
      //todo: to complete
      // applicationCache: asValue(applicationCache), // asValue because it's an application cache
      // permissionService: asClass(PermissionService).scoped()
    })
}
