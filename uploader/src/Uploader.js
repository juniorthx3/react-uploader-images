import React from 'react'
import axios from 'axios'

const Uploader = ({selectedImage, setSelectedImage}) => {
    
    const uploadImage=e=>{
        //Display uploaded pictures
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState === 2){
                setSelectedImage(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])
        
        //Select and store choosen picture
        setSelectedImage(e.target.files[0]);
        
        const formData=new FormData();
        formData.append('photos', e.target.files[0]);

        axios.post('/photo', formData)
             .then(response=>{
                console.log(response);
                alert("Image updated successfully!");
                setSelectedImage(selectedImage);
             });
        } 

    return (
        <div className="upload">
             <div className="edit">
                <input type='file' id="imageUpload" name="photos" accept=".png, .jpg, .jpeg" onChange={uploadImage} />
                <label htmlFor="imageUpload"></label>
            </div>
            <div className="preview">
                <img src={selectedImage} name="photoImage" id="imagePreview" width="250" height="250" alt="" />
            </div>
        </div>
    )
}

export default Uploader
