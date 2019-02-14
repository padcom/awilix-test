const awilix = require('awilix')
const { Lifetime, InjectionMode } = awilix

function registerControllersWithAwilix(container) {
  container
    .loadModules([
      'src/controllers/**/*.js'
    ], {
      formatName: 'camelCase',
      register: awilix.asClass,
      resolverOptions: {
        injectionMode: InjectionMode.CLASSIC,
        lifetime: Lifetime.SINGLETON,
      }
    })
}

function getRegisteredControllers (container, suffix = 'Controller') {
  return Object.keys(container.registrations).filter(reg => reg.endsWith(suffix))
}

function assertControllerContract(controller) {
  if (!controller.path) {
    throw Error(`Controller '${controllerName}' does not define 'path' property`)
  }
  if (!controller.execute) {
    throw Error(`Controller '${controllerName}' does not define 'execute' method`)
  }
}

function registerControllersWithExpress(container, app, controllers) {
  controllers
    .forEach(controllerName => {
      const controller = container.cradle[controllerName]
      assertControllerContract(controller)
      app.get(controller.path, controller.execute.bind(controller))
    })
}

module.exports = (container, app, suffix = 'Controller') => {
  registerControllersWithAwilix(container)
  registerControllersWithExpress(container, app, getRegisteredControllers(container, suffix))
}
