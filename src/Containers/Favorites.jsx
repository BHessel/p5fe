import React, { useState, useEffect } from 'react'
import FavCard from '../Presentational/FavCard'

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

    

    return (
        <>
            <div className="playlist-container">
                    <h1 className='playlist-header'>My Playlist</h1>
                        
                        {userFavorites.map((fav, i) =>
                             (<>
                             <div className={`pl-grid-${i}`}>
                                <FavCard 
                                    favorite={fav}
                                    key={i}
                                // removeClick={removeFromFavorites}
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