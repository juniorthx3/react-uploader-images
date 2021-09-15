const express=require("express");
const router=express.Router();
const { Photos }=require("../models/photosModel");
const { Mongoose } = require("mongoose");
const multer=require("multer");

const upload=multer({
    dest:'./img/'
});

router.get("/", (req, res, next)=>{
    Photos.find((err, data)=>{
       if(err){
          console.log(err);
       }else{
         res.send(data);
       }
    })
});

router.post("/", upload.single('image'),(req, res)=>{
    const record=new Photos({
        filename: req.body.filename,
        desc:req.body.desc,
    })
    record.save((err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data)
        }
    })
})

module.exports = router