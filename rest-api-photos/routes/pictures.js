const express=require("express");
const router=express.Router();
const { Photos }=require("../models/photosModel");

router.get("/", (req, res, next)=>{
    Photos.find((err, data)=>{
       if(err){
          console.log("No Data", err);
       }else{
         res.send(data);
       }
    })
});

router.post("/", (req, res)=>{
    const record=new Photos({
        filename: req.body.filename,
        size:req.body.size,
        created_at:req.body.created_at
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