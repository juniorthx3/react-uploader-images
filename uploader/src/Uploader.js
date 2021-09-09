import React from 'react'

const Uploader = ({selectedImage, setSelectedImage}) => {
    const uploadImage=e=>{
        // const reader=new FileReader();
        // reader.onload=()=>{
        //     if(reader.readyState === 2){
        //         setSelectedImage(reader.result);
        //     }
        // }
        // reader.readAsDataURL(e.target.files[0])
        console.log(e.target.files[0]);
        
    }
    return (
        <div className="upload">
             <div className="edit">
                <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={uploadImage} />
                <label htmlFor="imageUpload"></label>
            </div>
            <div className="preview">
                <img src={selectedImage} id="imagePreview" width="250" height="250" alt="" />
            </div>
        </div>
    )
}

export default Uploader
