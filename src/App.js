import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/Auth/Login'
import Layout from './components/Layout/Layout'
import Main from './components/Main/Main'
import FindUserId from './components/UserSettings/FindUserId'
import FindUserPassword from './components/UserSettings/FindUserPassword'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/index' exact component={Main}/>
        <Route path='/login' exact component={Login} />
        <Route path='/account/FindUserId' exact component={FindUserId}/>
        <Route path='/account/FindUserPassword' exact component={FindUserPassword}/>
        <Route path='*'><Redirect to="/" /> </Route>
      </Switch>
    </Layout>
  );
}

export default App;
