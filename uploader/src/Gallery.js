import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Gallery = ({title, selectedImage}) => {
  const [image, setImage] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:4000/pictures')
         .then(response=>{
           setImage(response.data);
         })
  })
    return (
      <React.Fragment>
            <h1>{title}</h1>
            <div className="gallery">
              {/* {
                image.map(imaj=>{
                  <div className="gallery-item"><img src={imaj.path} alt="" /></div>
                })
              } */}
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
