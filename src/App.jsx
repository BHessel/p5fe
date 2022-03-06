import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { getUsers } from '../src/Containers/import'

//Component imports
import VideoContainer from './Containers/VideoContainer';
import LoginForm from './Containers/LoginForm';
import Favorites from './Containers/Favorites';
import NotFound from './Presentational/NotFound';
import Banner from './Presentational/Banner'
import Matches from './Containers/Matches';
import { fetchFavorites } from './Containers/import';

//AWS imports
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const App = ({ signOut, user }) => {

  const [ currentUser, setCurrentUser ] = useState({id: 1, username: 'ben123', password: 'password'})
  const [ allFavs, setAllFavs ] = useState([])
  const [ allUsers, setAllUsers ] = useState([])
  
    
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

    //set state for allUsers
    useEffect(() => {
      const handleGetUsers = async () => {
          try {
              let users = await getUsers()
              setAllUsers(users)
          } catch(e) {
              console.log('e', e)
          }
      }
      return handleGetUsers()
    }, [])


  console.log('allUsers list', allUsers)

  
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
              allUsers={allUsers}
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