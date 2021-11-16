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
});

//Retrieve photos metadata stored in the photos collection of the GridFS bucket.
const showPhotos=async (req, res)=>{
    const files=await gfs.find().toArray();
    if(!files || files.length === 0){
        return res.status(404).json({message:"No data currently in the database"});  
    } 
    return res.json(files);
};

//Upload Photo
const uploadPhoto=(req, res)=>{
    if(req.file === undefined) return res.json({message:"Select a picture"});
    res.redirect("/photo");
}

//Retrieve a photo metadata using field _id
const searchPhotoById=async ({params: {id}}, res)=>{
    const _id=new mongoose.Types.ObjectId(id);
    const file= await gfs.find({_id}).toArray();
    if(!file || file.length === 0){
        return res.status(404).json({message:"Image not found!"});  
    } 
    return res.json(file);
};

//Stream the Photo by using field _id
const displayPhotoById=async ({params: {id}}, res)=>{
    const _id=new mongoose.Types.ObjectId(id);
    const file=await gfs.find({_id}).toArray();
    if(!file || file.length === 0){
        return res.status(404).json({message:"No image found"});  
    } 
    gfs.openDownloadStream(_id).pipe(res);
};

const deletePhotoById=async ({params: {id}}, res)=>{
    const _id=new mongoose.Types.ObjectId(id);
    await gfs.delete(_id, err=>{
        if(err) return res.status(500).json({message:'Image deletion error'});
        res.json({message:"Delete Image successfully!"});
    });
};


//Search Photo by using field filename
const searchPhotoByFilename=async (req, res)=>{
    const file= await gfs.find({filename:req.params.filename}).toArray();
    if(!file || file.length === 0){
        return res.status(404).json({message:"Image not found!"});  
    } 
    return res.json(file);
};

//Stream the Photo by using field _id
const displayPhotoByFilename=async (req, res)=>{
    const file=await gfs.find({filename:req.params.filename}).toArray();
    if(!file || file.length === 0){
        return res.status(404).json({message:"No image found"});  
    } 
    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
};

const deletePhotoByFilename=async (req, res)=>{
    gfs.delete({filename:req.params.filename}, err=>{
        if(err) return res.status(500).json({message:"Image Deletion Error"});
        res.json({message:"Delete Image Successfully!"});
    })
};

module.exports.showPhotos=showPhotos;
module.exports.uploadPhoto=uploadPhoto;
module.exports.searchPhotoById=searchPhotoById;
module.exports.displayPhotoById=displayPhotoById;
module.exports.searchPhotoByFilename=searchPhotoByFilename;
module.exports.displayPhotoByFilename=displayPhotoByFilename;
module.exports.deletePhotoById=deletePhotoById;
module.exports.deletePhotoByFilename=deletePhotoByFilename;