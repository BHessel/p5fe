import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'
import '../../node_modules/react-modal-video/scss/modal-video.scss'


const VideoCard = ({ video, key, addToFavorites, favorite }) => {

    const [isOpen, setOpen] = useState(false)
    
    return (

        <div className="card-container" key={key}>
            <div className="vid-card-img">
                <img src={video.thumbnail} alt="video thumbnail"/>
            </div>
        <div className='card-content'>
            
            <p className="vid-card-title">{video.title}</p>
            
            <div className='vid-card-buttons'>
                <div className="modalComponent">
                    <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={video.url.split('/')[3]} onClose={() => setOpen(false)} />
                    <button className='vid-card-btn' onClick={() => setOpen(true)}>Play Now</button>
                </div> 
                <div className='conditional'>
                    {window.location.pathname === '/Favorites' ?
                    <button className='remove-btn' onClick=''>Remove from Favorites</button> : 
                    <button className='vid-card-btn' onClick={() => addToFavorites(video)}>Add to Favorites</button>
                    }  
                </div>
            </div>
        </div>
                       
        </div>
    )
}

export default VideoCard