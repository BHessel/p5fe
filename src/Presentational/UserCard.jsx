import React from 'react'

const UserCard = ({ foundUser }) => {

    return (
        <div>
            <p>Found! {foundUser[0].username} </p>
            
        </div>
    )
}

export default UserCard