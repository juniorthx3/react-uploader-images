import React, { useState } from 'react'
import ImageHandler from './ImageHandler'
import cat from "./img/cat.jpg"
import "./style.css"



const App = () => {
    const [selectedImage, setSelectedImage] = useState(cat)
    const [preview, setPreview] = useState("")
    return (
        <React.Fragment>
            <ImageHandler selectedImage={selectedImage} 
                          setSelectedImage={setSelectedImage} 
                          preview={preview}
                          setPreview={setPreview}
            />
        </React.Fragment>
    )
}

export default App
