import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import VideoContainer from './Containers/VideoContainer';
import LoginForm from './Containers/LoginForm';
import NotFound from './Presentational/NotFound';


export default function App() {

  const [ loggedIn, setLoggedIn ] = useState(false)
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
          component={() =>
            <LoginForm
              setCurrentUser={setCurrentUser}
            />}
        />
        <Route
          exact path = '/VideoContainer'
          component={() =>
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
