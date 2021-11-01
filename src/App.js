import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import VideoContainer from './Containers/VideoContainer';
import LoginForm from './Containers/LoginForm';
import NotFound from './Presentational/NotFound';


export default function App() {

  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  const setCurrentUser = (currentUser) => {
    setUser(currentUser)
    setLoggedIn(true)
  }

  const logOut = () => {
    setUser({})
    setLoggedIn(false)
    localStorage.token = ''
  }

  useEffect(() => {
    authFetch()
  }, [])
  
  
  const authFetch = async () => {
    console.log("mounted")
    if(localStorage.getItem("token")){
      const res = await fetch("http://localhost:3000/decode_token")
      const data = await res.json()
      setUser(data)
      console.log(data)
    }
  }
  
  return (
    <>
      <div>
        <h1>App showing up</h1>
        <h4>Step 1: Create form to create user, create form to log user in</h4>
          <p>done. tracking state of the form as typed in</p>
        <h4>install (done) and set up react router, App feeds to maincontainer or Login component? If loggedin, send to Main. if not, go to login/signup. </h4>
        <h4>import components. i should automatically be @ login/signup here, I enter data into both forms and make sure it console logs, then set up post rqst for creating a user</h4>
        <h4>Step 2: Make sure I can create a user</h4>
          <p>for this I need to set up handleLoginSubmit function and createUser. Should these all be async functions? Also do need update currentUser function</p>


        <h4>Step 3: Make sure I can log in as a user</h4>
      </div>

      {loggedIn ? (
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
    </>
  )
}
