import Debug from 'debug'
import Horizon from '@horizon/client'

const debug = Debug('horizon')

let horizonProps
if (~window.location.href.indexOf('/admin')) {
  horizonProps = { authType: 'token' }
} else {
  horizonProps = { authType: 'unauthenticated' }
}

const hz = Horizon(horizonProps)

hz.connect()

ensureAuth()

export default hz

function ensureAuth (cb) {
  if (horizonProps.authType === 'unauthenticated') { return }
  // auth is required
  if (!hz.hasAuthToken()) {
    hz.authEndpoint('google').subscribe((endpoint) => {
      window.location.replace(endpoint)
    })
  } else {
    debug('user is authenticated')
  }
}
