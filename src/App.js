import { Connector } from 'horizon-react'
import { Router, Route, browserHistory } from 'react-router'
import Horizon from '@horizon/client'

import JobAppPage from './pages/job-app.js'
import LogoutPage from './pages/logout.js'
import JobAppViewPage from './pages/job-app-view.js'
import AdminPage from './pages/admin.js'
import hz from './horizon.js'
import store from './store.js'

if (window.location.search && ~window.location.search.indexOf('horizon_token')) {
  window.location.href = '/admin'
}
if (/^\/logout/i.test(window.location.pathname)) {
  Horizon.clearAuthTokens()
}

export default () => {
  return <Connector horizon={hz} store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={JobAppPage} />
      <Route path='/logout' component={LogoutPage} />
      <Route path='/admin' component={AdminPage} />
      <Route path='/admin/:applicationId' component={JobAppViewPage} />
    </Router>
  </Connector>
}
