// import React, { useState, useEffect } from 'react'
import FavCard from '../Presentational/FavCard'
import { Link } from 'react-router-dom'

const Favorites = ({ allFavs, currentUser }) => {

    console.log('allFavs on favs', allFavs)
    console.log('crntuser on favs', currentUser)

    //filters all favorites to just be my favorites, maps our FavCards for each in return()
    const currentUserFavs = allFavs.filter(favorite => favorite.user_id === currentUser.id)

    const removeFromFavorites = (favorite) => {
        console.log('removeFromFavorites', favorite)
        let localhostFavs = "http://localhost:3000/favorites"
        let favId = favorite.id
      
        //DELETE rqst to rails backend
        fetch(`${localhostFavs}/${favId}`, {
          method: "DELETE",
          header:{'Accept':'application/json'},
          'Content-Type':'application/json'
         })
    }

    return (
        <>
            <button>
                <Link to='/'>
                Return Home
                </Link>
            </button>

            <div className="playlist-container">
                    <h1 className='playlist-header'>My Playlist</h1>
                        
                        {currentUserFavs.map((fav, i) =>
                             (<>
                             <div className={`pl-grid-${i}`}>
                                <FavCard 
                                    favorite={fav}
                                    key={i}
                                    removeClick={removeFromFavorites}
                                />
                            </div>
                            </>
                        ))}    
            </div>
        </>
    )
}

export default Favorites