import React from 'react'
import Gallery from './Gallery'
import Uploader from './Uploader'

const ImageHandler = ({selectedImage, setSelectedImage}) => {
    return (
        <div className="container">
            <Gallery title="GRUD IMAGES" />
            <Uploader selectedImage={selectedImage} 
                      setSelectedImage={setSelectedImage} 
            />
            <Gallery title="UPLOADED IMAGES" />
        </div>
    )
}

export default ImageHandler
