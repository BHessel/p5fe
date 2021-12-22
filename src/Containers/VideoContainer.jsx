import React, { useState, useEffect, useRef } from 'react'
import VideoCard from '../Presentational/VideoCard'
import UserCard from '../Presentational/UserCard'
import { Link } from 'react-router-dom'
import { getUsers } from './import'


const VideoContainer = ({ currentUser }) => {
    
    const [ videos, setVideos ] = useState([])
    const [ allUsers, setAllUsers ] = useState([])
    const [ userSearch, setUserSearch ] = useState('')
    const [ foundUser, setFoundUser ] = useState([])
    const userSearchRef = useRef()

console.log('import getUsers from file', getUsers)
console.log('import getUsers from file, invoked', getUsers())

    
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

    useEffect(() => {
        const users = async () => {
            try {
                let response = await getUsers()
                setAllUsers(response)
            } catch(e) {
                console.log('e', e)
            }
        }
        return users
    }, [])


    console.log('allUsers list', allUsers)

    
    // //fetch all users
    // useEffect(() => {
    //     const userURL = 'http://localhost:3000/users/'

    //     const fetchUsers = async () => {
    //         try {
    //             const response = await fetch(userURL)
    //             const userList = await response.json()
    //             setAllUsers(userList)
    //         } catch (error) {
    //             console.log("error", error)
    //         }
    //     }
    //     fetchUsers()
    // }, [])

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
        
        //         console.log('check localhost to confirm favorite is saved. current state of Favorites is:', userFavorites)
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