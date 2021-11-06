import React, { useState, useEffect } from 'react'
import VideoCard from '../Presentational/VideoCard'
import { Link } from 'react-router-dom'


const VideoContainer = ({ currentUser }) => {
    
    const [ videos, setVideos ] = useState([])
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
    //i think i basically need to move this up to a HomeContainer which would then pass to videoContainer which displays videoCards or to to favorites which also displays video cards
    //Need to get the video_id reference to show the movie data


    //fetch all videos
    useEffect(() => {
        const url = 'http://localhost:3000/videos'

        const fetchVideos = async () => {
            try {
                const response = await fetch(url)
                const videoList = await response.json()
                setVideos(videoList)
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchVideos()
    }, [])

    //add video to favorites
    //POST request plus update state
    
    const addToFavorites = (video) => {
        
        console.log('video obj in addtoFavs', video)
        console.log('currentUser is', currentUser)
        
        let favorites = {
            user_id: currentUser.id,
            video_id: video.id     
        }

        console.log(favorites)

        let requestPackage = {
            method: "POST",
            headers: {"Content-Type": "application/json", Accept: "application/json"},
            body: JSON.stringify({ favorites })
        }
        
        fetch('http://localhost:3000/favorites', requestPackage)
        //     .then(response => response.json())
        //     .then(favorite => {
        //         if(!userFavorites.includes(favorite)){
        //             setUserFavorites([...userFavorites, favorite])
        //         }
        //     })
        // //if the state of userFavorites does not include the given favorite, add it to userFavorites
        
        //         console.log('check localhost to confirm favorite is saved. current state of Favorites is:', userFavorites)
    }
    

    console.log('fetched video list:', videos)
 
    return (
        <>        
            <div className="video-container">
                <h2 className='video-header'>Welcome to Netflix MovieMatcher</h2>
                <p className='video-subheader'>Scroll or search for shows and movies and watch the trailer in this app. If you like it, add it to your favorites list, and then connect with friends to see where your TV interests match! </p>

                <div>
                    <button>
                        <Link to='/Favorites'>
                            See My Favorites
                        </Link>
                    </button>
                </div>

                    {videos.map((vid, i) =>
                        <div className={`vid-${i}`}>
                            <VideoCard 
                                video={vid}
                                key={i}
                                addToFavorites={addToFavorites}
                            />  
                        </div>
                    )}
            </div>
        </>
    )
}

export default VideoContainer