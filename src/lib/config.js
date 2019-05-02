if (typeof window === 'undefined') global.window = { location: { host: 'testhost' } }

const env = ((host) => {
  switch (true) {
    case host.includes('adminex.local.jib-ex.com'):
      return 'production'
    default:
      return 'develop'
  }
})(window.location.host)

export const config = require(`./config/${env}`)
