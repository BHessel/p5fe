import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'
import '../../node_modules/react-modal-video/scss/modal-video.scss'


const FavCard = ({ favorite }) => {

    const [isOpen, setOpen] = useState(false)

    console.log(favorite)
    
    return (
        <div className="card-bg-dark" key='{key}'>
            <div className="image">
                <img src='{video.thumbnail}' alt="video thumbnail"/>
            </div>
            <div className="title">
                <p></p>
            </div>
            {/* <div className="modalComponent">
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId='' onClose={() => setOpen(false)} />
                <button className='btn-primary' onClick={() => setOpen(true)}>Play Now</button>
            </div>  */}
            {/* <div className='conditional'>
                {window.location.pathname === '/Favorites' ?
                <button className='remove-btn' onClick=''>Remove from Favorites</button> : 
                <button className='add-btn' onClick={() => addToFavorites(video)}>Add to Favorites</button>
                }  
            </div> */}
                       
        </div>
    )
}

export default FavCard