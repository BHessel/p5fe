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
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);


const App = () => {

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

export default App