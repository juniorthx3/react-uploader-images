import React, { useState } from 'react'
import ImageHandler from './ImageHandler'
import cat from "./img/cat.jpg"
import "./style.css"

const App = () => {
    const [selectedImage, setSelectedImage] = useState(cat);

    return (
        <React.Fragment>
            <ImageHandler selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        </React.Fragment>
    )
}

export default App
