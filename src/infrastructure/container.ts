import { createContainer, AwilixContainer, asValue, asClass } from 'awilix'

export function configureContainer (): AwilixContainer {
  return createContainer()
    .register({
        //todo: to complete
        // applicationCache: asValue(applicationCache), // asValue because it's an application cache
        // permissionService: asClass(PermissionService).scoped()
    })
}
