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
        <div>
            <p>Found! {foundUser[0].username} </p>
            <button onClick={(e) => followUser(e)}>Follow User</button>
            {/* write an onClick function that initiates a follow and alerts user is followed */}
            <button>Unfollow</button>
            {/* write function to delete the follow, alerts unfollowed */}
            <button>
                <Link to={{
                    pathname: "/Matches",
                    state: { matchUser: foundUser }
                }}>
                    See Matches
                </Link>
            </button>

        </div>
    )
}

export default UserCard