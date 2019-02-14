const deepmerge = require('deepmerge')

function getCurrentEnvironment() {
  return process.env.NODE_ENV || 'development'
}

function ensureConfigHasEntryForEnvironment(source, env) {
  source.env = source.env || {}
  source.env[env] = source.env[env] || {}
}

function extractDefaultConfigValues(source) {
  return Object.keys(source)
    .filter(key => key != 'env')
    .reduce((acc, key) => Object.assign({}, acc, { [key]: source[key] }), {})
}

module.exports = filename => {
  const source = require(`../../${filename}`)
  const env = getCurrentEnvironment()
  ensureConfigHasEntryForEnvironment(source, env)
  const config = extractDefaultConfigValues(source)
  return deepmerge(config, source.env[env])
}
