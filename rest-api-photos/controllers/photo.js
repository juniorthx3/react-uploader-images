const { Photos }=require("../models/photo");
const mongoose=require("mongoose");
const Grid=require("gridfs-stream");
const upload=require("../middleware/upload");

const showPhoto=async (req, res)=>{
    try{
       const results=await Photos.find();
       res.status(200).json(results);
    }catch(err){
       res.status(404).json({message:err.message})
    }
};

const uploadPhoto=async (req, res)=>{
    if(req.file === undefined) return res.send("Sélectionner une photo");
    const record=new Photos({
        filename: req.file.filename,
        url: "http://localhost:4000/photo/" + req.file.filename,
        mimetype:req.file.mimetype,
        encoding:req.file.encoding,
        size:req.file.size,
        photos:req.file.photos
    })
    try{
        await record.save();
        res.status(201).json(record);
    }catch(err){
        res.status(409).json({message: err.message});
    }
}

const showPhotoById=(req, res)=>{
    const {id}=req.params;
    Photos.findById(id, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    })
}


const showPhotos=(req, res)=>{
 gfs.files.find().toArray((err, files)=>{
     if(!files || files.length === 0){
         return res.status(404).json({err:"No files exist"});
     }
     return res.json(files);
 });
}

module.exports.showPhoto=showPhoto;
module.exports.uploadPhoto=uploadPhoto;
module.exports.showPhotoById=showPhotoById;
module.exports.showPhotos=showPhotos;