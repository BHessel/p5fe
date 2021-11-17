import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ foundUser }) => {

    return (
        <div>
            <p>Found! {foundUser[0].username} </p>
            <button>Follow User</button>
            {/* write an onClick function that initiates a follow and alerts user is followed */}
            <button>Unfollow</button>
            {/* write function to delete the follow, alerts unfollowed */}
            <button>
                <Link to='/Matches'>
                    See Matches
                </Link>
            </button>

        </div>
    )
}

export default UserCard