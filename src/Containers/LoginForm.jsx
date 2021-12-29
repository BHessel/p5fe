import React, { useState } from 'react'
import { Auth } from 'aws-amplify'

const LoginForm = ({ setCurrentUser, setLoggedIn }) => {
    
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleUsername = (e) => {
        let username = e.target.value
        setUsername(username)
    }
    
    const handlePassword = (e) => {
        let password = e.target.value
        setPassword(password)
    }

    //BELOW IS ORIGINAL CREATE USER AND HANDLE LOGIN SUBMIT FUNCTIONS
    // const createUser = (e) => {
        
    //     e.preventDefault()
    //     // e.target.reset();
        
    //     let user = {
    //         username: username,
    //         password: password
    //     }
          
    //     let requestPackage = {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({ user })
    //     }

    //     fetch("http://localhost:3000/users", requestPackage)
    //         .then((r) => r.json())
    //         .then(userData => setCurrentUser(userData))  
    // }

    // const handleLoginSubmit = () => {
        
    //     let user = {
    //         username: username,
    //         password: password
    //     }
    //     console.log('this is the login user data:', user)
    //     setCurrentUser({ user })
    // }


    const signUp = async () => {
        try {
            const user = await Auth.signUp(
                username,
                password
            );
            console.log('aws user', user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    const signIn = async () =>  {
        try {
            const user = await Auth.signIn(username, password);
            console.log('aws sign in', user)
        } catch (error) {
            console.log('error signing in', error);
        }
    }
    
   

    return (
        <>
        <div className="create-user left-side">
                    <form onSubmit={signUp}>

                        <h3>Create an Account</h3>
                        
                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Username" onChange={handleUsername} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" onChange={handlePassword} />
                        </div>


                        <button type="submit" className="btn btn-dark btn-lg btn-block">Create My Account</button>
                        
                    </form>
                </div>

                
                <div className="login-form right-side">
                    <form onSubmit={signIn}>
                        <h3>Log in</h3>
                        
                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Username is case sensitive" onChange={handleUsername} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password as well" onChange={handlePassword} />
                        </div>


                        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                        
                    </form>
                </div>
        </>
    )
}

export default LoginForm