import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/Auth/Login'
import Layout from './components/Layout/Layout'
import Main from './components/Main/Main'
import FindUserId from './components/UserSettings/FindUserId'
import FindUserPassword from './components/UserSettings/FindUserPassword'
import AuthContext from './store/auth-context'

function App() {
  const loginCtx = useContext(AuthContext)

  return (
    <Layout>
      <Switch>
        <Route path='/login' exact component={Login} />
        {loginCtx.isLoggedIn && <Route path='/index' exact component={Main} />}
        <Route path='/account/FindUserId' exact component={FindUserId} />
        <Route path='/account/FindUserPassword' exact component={FindUserPassword} />
        <Route path='*'><Redirect to="/" /> </Route>
      </Switch>
    </Layout>
  );
}

export default App;
