import React, { useEffect } from 'react'
import cat from "./img/cat.jpg"

const Uploader = ({selectedImage, setSelectedImage}) => {
    // useEffect(()=>{
    //   const reader=new FileReader();
    //   reader.onLoadend=()=>{

    //   }
    //   reader.readAsDataURL(selectedImage)

    // },[selectedImage])

    return (
        <div className="upload">
             <div className="edit">
                <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                <label for="imageUpload"></label>
            </div>
            <div className="preview">
               <div id="imagePreview" style={{backgroundImage:`url(${cat})`}} onChange={e=>{
                   const file=e.target.files[0]
                   if(file & file.type){
                      setSelectedImage(file)
                   }else{
                      setSelectedImage(null)
                   }
               }}></div>
               {/* <img src="" id="imagePreview" width="250" height="250" /> */}
               {/* <div id="imagePreview" style="background-image: url('./img/cat.jpg');"></div> */}
            </div>
        </div>
    )
}

export default Uploader
