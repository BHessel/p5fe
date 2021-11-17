import React from 'react'
import { useLocation } from 'react-router-dom'

const Matches = ({ allFavs, currentUser }) => {

    const location = useLocation()
    const { matchUser } = location.state

    console.log(location)
    console.log('matchUser', matchUser[0])
    console.log('allFavs', allFavs)

    //sort allFavs down to just the current User's
    const sortCurrentUserFavs = allFavs.filter(favorite => favorite.user_id === currentUser.id)
    console.log('sort', sortCurrentUserFavs)
    
    //sort allFavs down to just the matchUser's
    const sortMatchUserFavs = allFavs.filter(favorite => favorite.user_id === matchUser[0].id)
    console.log('sortMatch', sortMatchUserFavs)

    //compare both user's favorites to show matches
    const compare = (sortCurrentUserFavs, sortMatchUserFavs) => {
        let matchArray = []
        sortCurrentUserFavs.forEach((fav) => sortMatchUserFavs.forEach((favorite) => {
            if (fav.video_id === favorite.video_id){
                matchArray.push(fav.video.title)
            }
        }))
        return matchArray
    }

    let showMatches = compare(sortCurrentUserFavs, sortMatchUserFavs)
    let showUniqueMatches = [...new Set(showMatches)]
                
    console.log(showMatches)
    console.log(showUniqueMatches)


    

    return (
        <>
            <div className='match-favs'>
                <h3>You're both interested in...</h3>
                {showUniqueMatches.map((match, i) => 
                    <li>{match}</li>
                )}
            </div>

            <div className='my-favs'>
                <h3>My Favorites</h3>
                {sortCurrentUserFavs.map((favorite, i) =>
                    <li>{favorite.video.title}</li>
                )}
            </div>

            <div className='their-favs'>
                <h3>Matches Favorites</h3>      
                {sortMatchUserFavs.map((favorite, i) =>
                    <li>{favorite.video.title}</li>
                )}
            </div>
        </>
    )
}

export default Matches