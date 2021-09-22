import React from 'react'
import Gallery from './Gallery'
import Uploader from './Uploader'

const ImageHandler = ({selectedImage, setSelectedImage}) => {
    return (
        <div className="container">
            {/* <Gallerys title="GRUD IMAGES" /> */}
            <Uploader selectedImage={selectedImage} 
                      setSelectedImage={setSelectedImage} 
            />
            <Gallery title="UPLOADED IMAGES" selectedImage={selectedImage} />
        </div>
    )
}

export default ImageHandler

