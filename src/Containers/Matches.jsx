import React from 'react'
import { useLocation } from 'react-router-dom'

const Matches = () => {

    const location = useLocation()
    const { matchUser } = location.state
    console.log(location)
    console.log('matchUser', matchUser[0])

    return (
        <>
            <div>
                <h3>You're on the Match page</h3>
            </div>

            <div className='my-favs'>
            
            </div>

            <div className='their-favs'>

            </div>

            <div className='match-favs'>

            </div>
        </>
    )
}

export default Matches