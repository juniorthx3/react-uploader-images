import React, { useEffect, useState } from 'react'
import axios from 'axios'
import image1 from "./cat1.jpg"


const Gallery = ({title, selectedImage}) => {
  const [image, setImage] = useState([]);
  useEffect(()=>{
    axios.get('https://rest-api-photos.netlify.app/.netlify/functions/app/pictures')
         .then(response=>setImage(response.data));
  },[])
    return (
      <React.Fragment>
            <h1>{title}</h1>
            <div className="gallery">
              {/* {
                image.map(photo=>{
                  return  <img className="gallery-item" alt="" src={photo.url} key={photo._id} />
                })
              } */}
                <img className="gallery-item" alt="" src={image1} />
                <img className="gallery-item" alt="" src={image1} />
                <img className="gallery-item" alt="" src={image1} />
                <img className="gallery-item" alt="" src={image1} />
                <img className="gallery-item" alt="" src={image1} />
                <img className="gallery-item" alt="" src={image1} />
           </div>
      </React.Fragment>
    )
}

export default Gallery
