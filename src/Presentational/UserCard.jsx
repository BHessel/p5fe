import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ foundUser, currentUser }) => {

    const followUser = (e) => {
        e.preventDefault()
        console.log('send the post to follow user')
  
        let follow = {
        follower_id: currentUser.id,
        followed_user_id: foundUser[0].id
        }

        let requestPackage = {
        method: "POST",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify({ follow })
        }
        
        fetch("http://localhost:3000/follows", requestPackage)
        .then(alert("person followed!"))
    }

    return (
        <div className='user-card-main'>
            <h4>Found! {foundUser[0].username} </h4>

            <div className='user-card-buttons'>
                <button className='button-36' onClick={(e) => followUser(e)}>Follow User</button>
                {/* write an onClick function that initiates a follow and alerts user is followed */}
                <button className='button-36'>Unfollow</button>
                {/* write function to delete the follow, alerts unfollowed */}
                <button className='button-36'>
                    <Link to={{
                        pathname: "/Matches",
                        state: { matchUser: foundUser }
                    }}>
                        See Matches
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default UserCard