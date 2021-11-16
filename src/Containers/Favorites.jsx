import React, { useState, useEffect } from 'react'
import FavCard from '../Presentational/FavCard'
import { Link } from 'react-router-dom'

const Favorites = () => {

    const [ userFavorites, setUserFavorites ] = useState([])

    //fetch user favorites
    useEffect(() => {
        const url = 'http://localhost:3000/favorites'

        const fetchFavorites = async () => {
            try {
                const response = await fetch(url)
                const listAllFavorites = await response.json()
                setUserFavorites(listAllFavorites)
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchFavorites()
    }, [])

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
                        
                        {userFavorites.map((fav, i) =>
                             (<>
                             <div className={`pl-grid-${i}`}>
                                <FavCard 
                                    favorite={fav}
                                    key={i}
                                    removeClick={removeFromFavorites}
                                />
                            </div>
                            </>
                            ))
                        }    
            </div>
        </>
    )
}

export default Favorites