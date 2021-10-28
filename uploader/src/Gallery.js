import React, { useEffect, useState } from 'react'
import axios from 'axios'
import image1 from "./cat1.jpg"


const Gallery = ({title, selectedImage}) => {
  const [image, setImage] = useState([]);
  useEffect(()=>{
    axios.get('/pictures')
         .then(response=>setImage(response.data))
         .catch(err=>console.log(err));
  },[]);

    // const display=(image)=>{
    //   if(!image.length) return null;
    //   return image.map(photo=>{
    //     return  <img className="gallery-item" alt="" src={photo.url} key={photo._id} />
    //   })
    // }

    
    return (
      <React.Fragment>
            <h1>{title}</h1>
            <div className="gallery">
                <img className="gallery-item" alt="" src={image1} />
                <img className="gallery-item" alt="" src={image1} />
                <img className="gallery-item" alt="" src={image1} />
                <img className="gallery-item" alt="" src={image1} />
                <img className="gallery-item" alt="" src={image1} />
                <img className="gallery-item" alt="" src={image1} />
                {/* {display(image)} */}
           </div>
      </React.Fragment>
    )
}

export default Gallery
