const config = {
  env: 'production',
  web: {
    maintenance: false,
    name: 'Edogo'
  },
  api: {
    content: 'http://178.128.25.178:3004/api',
  },
  tcp: {
    connector: 'ws://178.128.25.178:3104'
  },
  auto: {
    interval: 60000, // 1 min
  },
}

module.exports = config
