import React, { useState, useEffect } from 'react'
import VideoCard from '../Presentational/VideoCard'


const VideoContainer = () => {
    
    const [ videos, setVideos ] = useState([])

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
    
    console.log('fetched video list:', videos)
 
    return (
        <>        
            <div className="video-container">
                <h2 className='video-header'>Welcome to Netflix MovieMatcher</h2>
                <p className='video-subheader'>Scroll or search for shows and movies and watch the trailer in this app. If you like it, add it to your favorites list, and then connect with friends to see where your TV interests match! </p>
                    {videos.map((vid, i) =>
                        <div className={`vid-${i}`}>
                            <VideoCard 
                                video={vid}
                                key={i}
                            />  
                        </div>
                    )}
            </div>
        </>
    )
}

export default VideoContainer