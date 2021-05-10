import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Header from './components/Header/Header'
import UI from './components/Auth/UI'

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Switch>

          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
         
          <Route path='*'>
            <Redirect to="/" />
          </Route>
        </Switch>
        {/* <UI/> */}
      </main>
    </React.Fragment>
  );
}

export default App;
