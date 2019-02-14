const awilix = require('awilix')
const express = require('express')
const config = require('./utils/config')('app.config.js')

const awilixConfigAutoRegistration = require('./utils/awilixConfigAutoRegistration')
const awilixServiceAutoRegistration = require('./utils/awilixServiceAutoRegistration')
const awilixControllerAutoRegistration = require('./utils/awilixControllerAutoRegistration')

const container = awilix.createContainer()

awilixConfigAutoRegistration(container, config)
awilixServiceAutoRegistration(container)

const app = express()
app.use(express.json())

awilixControllerAutoRegistration(container, app)

app.listen(3000, () => { console.log('Server listening on port 3000') })
