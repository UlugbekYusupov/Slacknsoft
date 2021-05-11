import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Layout from './components/Layout/Layout'
import Main from './components/Main/Main'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='*'><Redirect to="/" /> </Route>
      </Switch>
    </Layout>
  );
}

export default App;
