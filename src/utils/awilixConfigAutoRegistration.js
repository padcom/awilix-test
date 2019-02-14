const awilix = require('awilix')

module.exports = (container, config) => {
  Object.keys(config).forEach(key => { container.register(key, awilix.asValue(config[key])) })
}
