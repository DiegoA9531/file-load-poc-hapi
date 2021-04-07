const routes = [].concat(
  require('../routes/file'),
  require('../routes/about')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
