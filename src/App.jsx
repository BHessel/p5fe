import React, { useState } from 'react'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import VideoContainer from './Containers/VideoContainer';
import LoginForm from './Containers/LoginForm';
import Favorites from './Containers/Favorites';
import NotFound from './Presentational/NotFound';
import Banner from './Presentational/Banner'


const App = () => {

  // const [ loggedIn, setLoggedIn ] = useState(false)
  
  const [ currentUser, setCurrentUser ] = useState({id: 1, username: 'ben123', password: 'password'})

  
  return (
    <>
      <Banner 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

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
              currentUser={currentUser}
            />} 
        />

        <Route
          exact path = '/Favorites'
          render={() =>
            <Favorites

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

export default App