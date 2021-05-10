import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Layout from './components/Layout/Layout'

// import Header from './components/Header/Header'
// import UI from './components/Auth/UI'
// import Input from './components/UI/Input/Input'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='*'><Redirect to="/" /> </Route>
      </Switch>
    </Layout>
    
  );
}

export default App;
