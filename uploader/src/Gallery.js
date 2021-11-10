import React, { useEffect, useState } from 'react'
import axios from 'axios'
import image1 from "./cat1.jpg"


const Gallery = ({title, selectedImage}) => {
  const [image, setImage] = useState([]);
  useEffect(()=>{
    axios.get('/photo')
         .then(response=>{
           console.log(response.data);
           setImage(response.data);
         })
         .catch(err=>console.log(err));
  },[]);

    // const display=(image)=>{
    //   if(!image.length) return null;
    //   return image.map(photo=>{
    //     return  <img className="gallery-item" alt="" src={photo.filename} key={photo._id} />
    //   })
    // }

    
    return (
      <React.Fragment>
            <h1>{title}</h1>
            <div className="gallery">
                <img className="gallery-item" alt="" src={`http://localhost:4000/photo/display/2021-11-05T19-09-32.944Z-cat1.jpg`} />
                <img className="gallery-item" alt="" src={`http://localhost:4000/photo/display/2021-11-05T19-09-37.182Z-cat2.jpg`} />
                <img className="gallery-item" alt="" src={`http://localhost:4000/photo/display/2021-11-05T19-09-40.985Z-cat3.jpg`} />
                <img className="gallery-item" alt="" src={`http://localhost:4000/photo/display/2021-11-05T19-09-45.564Z-cat4.jpg`} />
                <img className="gallery-item" alt="" src={`http://localhost:4000/photo/display/2021-11-05T19-09-49.714Z-cat5.jpg`} />
                <img className="gallery-item" alt="" src={`http://localhost:4000/photo/display/2021-11-05T19-09-55.255Z-cat6.jpg`} />
                {/* {display(image)} */}
           </div>
      </React.Fragment>
    )
}

export default Gallery
