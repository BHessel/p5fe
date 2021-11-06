import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'
import '../../node_modules/react-modal-video/scss/modal-video.scss'


const VideoCard = ({ video, key }) => {

    const [isOpen, setOpen] = useState(false)

    console.log(video)


    return (
        <div className="card-bg-dark" key={key}>
            <div className="image">
                <img src={video.thumbnail} alt="video thumbnail"/>
            </div>
            <div className="title">
                <p>{video.title}</p>
            </div>
            <div className="modalComponent">
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId='qnx6-YLXFwg' onClose={() => setOpen(false)} />
                <button className='btn-primary' onClick={() => setOpen(true)}>Play Now</button>
            </div> 
            {/* <div className='conditional'>
                {this.state.location === 'favorites' ?
                <button className='remove-btn' onClick={() => this.props.removeClick(this.props.video)}>Remove from Favorites</button> :

                <button className='add-btn' onClick={() => this.props.buttonClick(this.props.video)}>Add to Favorites</button>
                }  
            </div> */}
                       
        </div>
    )
}

export default VideoCard