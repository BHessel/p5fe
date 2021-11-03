import React from 'react'

const VideoCard = ({ video, key }) => {
    return (
        <div className="card-bg-dark" key={key}>
            <div className="image">
                <img src={video.thumbnail} alt="video thumbnail"/>
            </div>
            <div className="title">
                <p>{video.title}</p>
            </div>
            {/* <div className="modalComponent">
                <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.props.video.id} onClose={() => this.setState({isOpen: false})} />
                <button className='play-btn' onClick={this.openModal}>Play Now</button>
            </div> 
            <div className='conditional'>
                {this.state.location === 'favorites' ?
                <button className='remove-btn' onClick={() => this.props.removeClick(this.props.video)}>Remove from Favorites</button> :

                <button className='add-btn' onClick={() => this.props.buttonClick(this.props.video)}>Add to Favorites</button>
                }  
            </div> */}
                       
        </div>
    )
}

export default VideoCard