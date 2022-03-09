import React, { useState, useEffect, useRef } from 'react'
import VideoCard from '../Presentational/VideoCard'
import UserCard from '../Presentational/UserCard'
import { Link } from 'react-router-dom'
import { fetchVideos } from './import'


const VideoContainer = ({ currentUser, allUsers }) => {
    
    const [ videos, setVideos ] = useState([])
    // const [ allUsers, setAllUsers ] = useState([])
    const [ userSearch, setUserSearch ] = useState('')
    const [ foundUser, setFoundUser ] = useState([])
    const userSearchRef = useRef()
    const [ currentPage, setCurrentPage ] = useState(1)
    
    //set state for all videos
    useEffect(() => {
        const handleFetchVideos = async () => {
            try {
                let allVideos = await fetchVideos()
                setVideos(allVideos)
            } catch(e) {
                console.log('e', e)
            }
        }
        return handleFetchVideos()
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
    }
    
    const handleSearch = () => {
        let searchValue = userSearchRef.current.value
        console.log('this is the searchvalue', searchValue)
        setUserSearch(searchValue)
    }

    const findFriend = (e) => {
        e.preventDefault()  //cancels an error in the terminal that said "form submission cancelled because the form is not connected"
        let findUser = allUsers.filter(user => user.username.toLowerCase() === userSearch.toLowerCase())
        setFoundUser(findUser)
    }



    console.log('fetched video list:', videos)
    console.log('fetched user list:', allUsers)



    return (
        <>   
            
                <h2 className='video-header'>Welcome to Netflix MovieMatcher</h2>
                <p className='video-subheader'>Scroll or search for shows and movies and watch the trailer in this app. If you like it, add it to your favorites list, and then connect with friends to see where your TV interests match! </p>

                <div className='favs-btn'>
                    <button>
                        <Link to='/Favorites'>
                            See My Favorites
                        </Link>
                    </button>
                </div>

            {/* in final form, maybe make this its own userSearch component? */}
                <div className='friend-search'>
                {/* this is the form to search for friends to follow */}
                    <p>Friend search box</p>
                    <form onSubmit={(e) => findFriend(e)}>
                        <input className='search' type='text' placeholder='Search...' ref={userSearchRef} onChange={handleSearch} />
                        <button className='submit-btn' type='submit'>
                            Search
                        </button>
                    </form>

                {/* this is where searched friends will appear */}
                {/* should be hidden initially, and reveal when a match is found */}
                <div className="show-friend-search">
                    <h4>{foundUser.length > 0 ? <UserCard foundUser={foundUser} currentUser={currentUser} /> : <div></div> }</h4>                   
                </div>
                </div>
                
                <div className="video-container">
                        {videos.map((vid, i) =>
                            
                                <VideoCard 
                                    video={vid}
                                    key={i}
                                    addToFavorites={addToFavorites}
                                />  
                            
                        )}
                </div>
        </>
    )
}


export default VideoContainer