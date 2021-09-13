const express=require("express");
const router=express.Router()
// const { PhotosModel }=require("../models/photosModel");

router.get("/", (req, res, next)=>{
    res.status(200).json({
        message:"data of pictures loaded will appear here"
    });
});

router.post("/", (req, res, next)=>{
    const picture={
        name:req.body.name,
        width:req.body.width,
        height:req.body.height
    }
    res.status(200).json({
        message:"Uploading a new Image",
        uploadPicture:picture
    })
})

router.get('/:id', (req, res, next)=>{
    const id=req.params.catId;
    res.status(200).json({message:"You required uploaded pictures data", id:id})
})


module.exports = router