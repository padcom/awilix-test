const awilix = require('awilix')
const { Lifetime, InjectionMode } = awilix

function registerServicesWithAwilix(container) {
  container
    .loadModules([
      'src/services/**/*.js',
    ], {
      formatName: 'camelCase',
      register: awilix.asClass,
      resolverOptions: {
        injectionMode: InjectionMode.CLASSIC,
        lifetime: Lifetime.SINGLETON,
      }
    })
}

module.exports = container => {
  registerServicesWithAwilix(container)
}
