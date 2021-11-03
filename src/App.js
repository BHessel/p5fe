import React, { useState } from 'react'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import VideoContainer from './Containers/VideoContainer';
import LoginForm from './Containers/LoginForm';
import NotFound from './Presentational/NotFound';


export default function App() {

  // const [ loggedIn, setLoggedIn ] = useState(false)
  const [ currentUser, setCurrentUser ] = useState(null)

  return (
    <>
      <div>

      {currentUser ? (
        <h1>Welcome back User</h1>
      ) : (
        <h1>still need to log in</h1>
      )}

      <Switch>
        <Route
          exact path = '/'
          render={() =>
          currentUser === null ?
            <LoginForm
              setCurrentUser={setCurrentUser}
            /> :
            <Redirect to='/VideoContainer' />
          }
        />

        <Route
          exact path = '/VideoContainer'
          render={() =>
            <VideoContainer

            />} 
        />
        <Route
          component={NotFound}
        />
      </Switch>
      </div>
    </>
  )
}
