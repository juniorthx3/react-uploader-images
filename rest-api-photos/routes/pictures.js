const express=require("express");
const router=express.Router();
const { Photos }=require("../models/photosModel");
const multer=require("multer");

const storage=multer.diskStorage({
    destination:function(request, file, callback){
        callback(null, 'uploads/');
    },
    filename:function(request, file, callback){
        const dateStr = new Date().toISOString().replace(/:/g, '-');
        callback(null, dateStr + '-' + file.originalname);
    },
});

const fileFilter=(req, file, callback)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null, true)
    }else{
        callback(null, false);
    }
}

const upload=multer({
    storage:storage,
    limits:{fileSize:1024 * 1024 * 3},
    fileFilter:fileFilter
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

router.post("/", upload.single('photoImage'), (req, res)=>{
    console.log(req.file);
    const record=new Photos({
        filename: req.file.filename,
        path: req.file.path,
        mimetype:req.file.mimetype,
        encoding:req.file.encoding,
        size:req.file.size
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