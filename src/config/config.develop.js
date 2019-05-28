const config = {
  env: 'develop',
  web: {
    maintenance: false,
    name: 'Edogo'
  },
  gmail: {
    client_id: '331249496316-ikhvvnhmrv459siqfk6uc8e5qmtkeq6h.apps.googleusercontent.com',
  },
  api: {
    main: 'http://127.0.0.1:3004/api',
  },
  tcp: {
    connector: 'ws://127.0.0.1:3104'
  },
  auto: {
    interval: 60000, // 1 min
  },
}

module.exports = config
