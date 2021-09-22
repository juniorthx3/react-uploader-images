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


router.get("/", (req, res)=>{
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
    if(req.file=== undefined) return res.send("Séelectionner une photo")
    const record=new Photos({
        filename: req.file.filename,
        url: "http://localhost:4000/pictures/uploads/" + req.file.filename,
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

router.get("/:id", (req, res)=>{
    const {id}=req.params;
    Photos.findById(id, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    })
})

router.get("/uploads/:filename", (req, res)=>{
    const {filename}=req.params;
    Photos.findOne({filename:filename},(err, data)=>{
        if(err){
           console.log(err);
        }else{
          res.send(data);
        }
     })
})

module.exports = router