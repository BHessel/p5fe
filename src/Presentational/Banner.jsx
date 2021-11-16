import React from 'react'
import { useHistory } from 'react-router-dom'

const Banner = ({ currentUser, setCurrentUser }) => {

    let history = useHistory()

    const logout = () => {
        setCurrentUser(null)
        history.push('/')
    } 


    return (
        <div className='banner-box'>
            
            <div className='logout'>
                {currentUser ? (
                    <button className='logout-btn' onClick={logout}>
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