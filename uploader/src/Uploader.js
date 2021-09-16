import React, { useState } from 'react'
import axios from 'axios'

const Uploader = ({selectedImage, setSelectedImage}) => {
    
    const uploadImage=e=>{
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState === 2){
                setSelectedImage(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])
        // console.log(e.target.files[0]);
        setSelectedImage(e.target.files[0])
    } 

    const processUploadFile=()=>{
        const fd=new FormData();
        fd.append('image', selectedImage);
        axios.post('http://localhost:4000/pictures')
             .then(response=>console.log(response))
    }

    return (
        <div className="upload">
             <div className="edit">
                <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={uploadImage} />
                <label htmlFor="imageUpload"></label>
            </div>
            <div className="preview">
                <img src={selectedImage} name="photoImage" id="imagePreview" width="250" height="250" alt="" />
            </div>
        </div>
    )
}

export default Uploader
