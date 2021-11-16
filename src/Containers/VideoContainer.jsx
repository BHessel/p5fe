import React, { useState, useEffect, useRef } from 'react'
import VideoCard from '../Presentational/VideoCard'
import { Link } from 'react-router-dom'


const VideoContainer = ({ currentUser }) => {
    
    const [ videos, setVideos ] = useState([])
    const [ search, setSearch ] = useState('')
    const userSearchRef = useRef()


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
            user_id: 1,
            //hard-coded to make it work w/ fake login
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
    
    const handleSearch = () => {
        let searchValue = userSearchRef.current.value
        setSearch(searchValue)
    }

    console.log('fetched video list:', videos)

    return (
        <>   
            <div className="video-container">
                <h2 className='video-header'>Welcome to Netflix MovieMatcher</h2>
                <p className='video-subheader'>Scroll or search for shows and movies and watch the trailer in this app. If you like it, add it to your favorites list, and then connect with friends to see where your TV interests match! </p>

                <div className='favs-btn'>
                    <button>
                        <Link to='/Favorites'>
                            See My Favorites
                        </Link>
                    </button>
                </div>

                <div className='friend-search'>
                    <p>Friend search box</p>
                    <input className='search' type='text' placeholder='Search...' ref={userSearchRef} />
                    <button className='submit-btn' onClick={handleSearch}>
                        Search
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