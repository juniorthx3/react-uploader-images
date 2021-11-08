const { Photos }=require("../models/photo");
const mongoose=require("mongoose");
const upload=require("../middleware/upload");
const Grid=require("gridfs-stream");
require("dotenv").config();

//Init GFS
let gfs;

//Create mongo Connection
const connection=mongoose.createConnection(process.env.MONGO_URI);
connection.once("open", ()=>{
    //Init Stream
    gfs=Grid(connection.db, mongoose.mongo);
    gfs.collection("photos");
})


const showPhotos=async(req, res)=>{
    await gfs.files.find().toArray((err, files)=>{
      if(!files || files.length === 0){
          return res.status(404).json({message:"No data currently in the database"});  
      } 
      return res.json(files);
    });
};

const uploadPhoto=(req, res)=>{
    if(req.file === undefined) return res.json({message:"Select a picture"});
    res.redirect("/photo");
}

const searchPhotoByName=async (req, res)=>{
    await gfs.files.findOne({filename:req.params.filename}, (err, file)=>{
        if(!file || file.length === 0){
            return res.status(404).json({message:"File not found"});  
        } 
        return res.json(file);
    })
}

const displayPhoto=async (req, res)=>{
    await gfs.files.findOne({filename:req.params.filename}, (err, file)=>{
        if(!file || file.length === 0){
            return res.status(404).json({message:"File not found"});  
        } 
        if(file.contentType === 'image/jpeg' || file.contentType ==='image/png'){
           let readStream=gfs.createReadStream(file.filename);
           readStream.pipe(res);
        }else{
            res.status(404).json({message:"Not an image"});
        }
    });
}

const allPhotos=(req, res)=>{
    gfs.files.find().toArray((err, files)=>{
        if(!files || files.length === 0){
            return res.status(404).json({message:"File not found"});  
        }else{
            files.map(file=>{
                if(file.contentType === 'image/jpeg' || file.contentType ==='image/png'){
                         file.isImage=true
                         res
                 }
                 else{
                         file.isImage=false;
                 }
            });
            res.json(files);
        }
    })
}


module.exports.showPhotos=showPhotos;
module.exports.uploadPhoto=uploadPhoto;
module.exports.searchPhotoByName=searchPhotoByName;
module.exports.displayPhoto=displayPhoto;
module.exports.allPhotos=allPhotos;