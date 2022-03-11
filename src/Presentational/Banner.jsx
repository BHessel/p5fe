import React from 'react'
import { useHistory } from 'react-router-dom'

const Banner = ({ signOut, currentUser, setCurrentUser }) => {

    let history = useHistory()

    const logout = () => {
        setCurrentUser(null)
        history.push('/')
    } 


    return (
        <div className='banner-box'>

            <div className='logo'>
                <p>IMAGE</p>
            </div>
            
            <div className='logout'>
                {currentUser ? (
                    <button className='logout-btn' onClick={signOut}>
                        Logout
                    </button>
                ) : (
                    <button className='get-started-btn'>
                        Get Started
                    </button>
                )}
            </div>
            
        </div>
    )
}

export default Banner