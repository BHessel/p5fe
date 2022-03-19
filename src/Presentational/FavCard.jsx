import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'
import '../../node_modules/react-modal-video/scss/modal-video.scss'


const FavCard = ({ favorite, key, removeClick }) => {

    const [isOpen, setOpen] = useState(false)

    console.log(favorite)
    
    return (
        <div className="card-container-favs" key={key}>
            <div className="fav-card-img">
                <img src={favorite.video.thumbnail} alt="video thumbnail"/>
            </div>

        <div className='fav-card-content'>
            <div className="fav-card-title-container">
                <h2>{favorite.video.title}</h2>
            </div>

            <div className="fav-card-buttons">
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId='' onClose={() => setOpen(false)} />
                <button className='fav-card-btn' onClick={() => setOpen(true)}>Play Now</button>
                
                    <button className='fav-card-btn' onClick={() => removeClick(favorite)}>Remove from Favorites
                    </button>
                
            </div> 
        </div>
                       
        </div>
    )
}

export default FavCard