import React from 'react'
import axios from 'axios'

const Uploader = ({selectedImage, setSelectedImage}) => {
    
    const handleFile=e=>{
        //Display uploaded pictures and store choosen pictures
        const reader=new FileReader();
        reader.onload=()=>reader.readyState === 2 ?  setSelectedImage(reader.result) : null;
        reader.readAsDataURL(e.target.files[0])
        setSelectedImage(e.target.files[0]);
        const formData=new FormData();
        formData.append('photos', e.target.files[0]);
        uploadImage(formData)
    } 

    const uploadImage=(formData)=>{
        axios.post('/photo', formData)
             .then(response=>{
                    alert("Image updated successfully!");
                    setSelectedImage(selectedImage);
                  })
             .catch(err=>{
                    alert("Error uploading the file");
                    setSelectedImage(selectedImage);
                 });
    }

    return (
        <div className="upload">
             <div className="edit">
                <input type='file' id="imageUpload" name="photos" accept=".png, .jpg, .jpeg" onChange={handleFile} />
                <label htmlFor="imageUpload"></label>
            </div>
            <div className="preview">
                <img src={selectedImage} name="photoImage" id="imagePreview" width="250" height="250" alt="" />
            </div>
        </div>
    )
}

export default Uploader
