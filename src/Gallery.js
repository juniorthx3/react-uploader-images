import React from 'react'

const Gallery = ({title}) => {
    return (
      <React.Fragment>
            <h1>{title}</h1>
            <div className="gallery">
                <div className="gallery-item"></div>
                <div className="gallery-item"></div>
                <div className="gallery-item"></div>
                <div className="gallery-item"></div>
                <div className="gallery-item"></div>
                <div className="gallery-item"></div>
        </div>
      </React.Fragment>
    )
}

export default Gallery
