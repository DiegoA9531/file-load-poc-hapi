const hapi = require('@hapi/hapi')
const config = require('./config')
const SequelizeConnection = require('./lib/sequelize.connection')

async function createServer () {
  let connectionManager = new SequelizeConnection();
  connectionManager.getConnection();
  
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })

  // Register the plugins
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/log-errors'))
  //await server.register(require('./plugins/logging'))
  await server.register(require('blipp'))

  return server
}

module.exports = createServer
