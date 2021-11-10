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
    // Constructor for a streaming GridFS interface
    gfs = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'photos'});
})

//Display properties of all the pictures saved in the DB in a JSON format
const showPhotos=async (req, res)=>{
    await gfs.find().toArray((err, files)=>{
      if(!files || files.length === 0){
          return res.status(404).json({message:"No data currently in the database"});  
      } 
      return res.json(files);
    });
};

//Upload photo in the database
const uploadPhoto=(req, res)=>{
    if(req.file === undefined) return res.json({message:"Select a picture"});
    res.redirect("/photo");
}

//Search Photo by using field _id
const searchPhotoById=async ({params: {id}}, res)=>{
    const _id=new mongoose.Types.ObjectId(id);
    await gfs.find({_id}).toArray((err, file)=>{
        if(!file || file.length === 0){
            return res.status(404).json({message:"Image not found!"});  
        } 
        return res.json(file);
    });
};

//Stream the Photo by using field _id
const displayPhotoById=async ({params: {id}}, res)=>{
    const _id=new mongoose.Types.ObjectId(id);
    await gfs.find({_id}).toArray((err, file)=>{
      if(!file || file.length === 0){
          return res.status(404).json({message:"No image found"});  
      } 
    gfs.openDownloadStream(_id).pipe(res);
    });
};


module.exports.showPhotos=showPhotos;
module.exports.uploadPhoto=uploadPhoto;
module.exports.searchPhotoById=searchPhotoById;
module.exports.displayPhotoById=displayPhotoById;