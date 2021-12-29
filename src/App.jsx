import React, { useState, useEffect } from 'react'
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
import Matches from './Containers/Matches';
import { fetchFavorites } from './Containers/import';

import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const App = ({ signOut, user }) => {

  // const [ loggedIn, setLoggedIn ] = useState(false)
  
  const [ currentUser, setCurrentUser ] = useState({id: 1, username: 'ben123', password: 'password'})
  const [ allFavs, setAllFavs ] = useState([])

    console.log('allFavs', allFavs)
    
    //fetch user favorites
    useEffect(() => {
        const handleFetchFavorites = async () => {
            try {
                let allFavorites = await fetchFavorites()
                setAllFavs(allFavorites)
            } catch (e) {
                console.log("error", e)
            }
        }
        handleFetchFavorites()
    }, [])

  
  return (
    <>
      <Banner 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        signOut={signOut}
      />

      <div>

      {currentUser ? (
        <h1>Welcome back {user.attributes.email}</h1>
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
              allFavs={allFavs}
              currentUser={currentUser}
            />} 
        />

        <Route
          exact path = '/Matches'
          render={() =>
            <Matches
              allFavs={allFavs}
              currentUser={currentUser}
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

export default withAuthenticator(App)