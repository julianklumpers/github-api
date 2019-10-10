import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// simple code-splitting
const Users = React.lazy(() => import('./containers/Users'))
const User = React.lazy(() => import('./containers/User'))

const App = () => {
  return (
    <React.Suspense fallback="Loading...">
      <Router>
        <Switch>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/users/:username" exact>
            <User />
          </Route>
          {/* always redirect to /users if no path is matching */}
          <Route path="/">
            <Redirect to="/users" />
          </Route>
        </Switch>
      </Router>
    </React.Suspense>
  )
}

export default App
