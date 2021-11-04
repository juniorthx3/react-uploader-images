const { Photos }=require("../models/photo");
const mongoose=require("mongoose");
const Grid=require("gridfs-stream");
require("dotenv").config();

//Create mongo Connection
const connection=mongoose.createConnection(process.env.MONGO_URI);

//Init GFS
let gfs;

connection.once("open", ()=>{
    //Init Stream
    gfs=Grid(connection.db, mongoose.mongo);
    gfs.collection("photos");
})

const showPhotos=(req, res)=>{
    gfs.files.find().toArray((err, files)=>{
      if(!files || files.length === 0){
          return res.status(404).json({message:"Pas de photos enregistrées dans la base de données"});  
      } 
      return res.json(files);
    })
};

const uploadPhoto=(req, res)=>{
    if(req.file === undefined) return res.json({message:"Sélectionner une photo"});
    res.redirect("/photo");
}

const searchPhotoByName=(req, res)=>{
    gfs.files.findOne({filename:req.params._id}, (err, file)=>{
        if(!file || file.length === 0){
            return res.status(404).json({message:"Ce photo n'existe pas dans la base de données"});  
        } 
        return res.json(file);
    })
}

module.exports.showPhotos=showPhotos;
module.exports.uploadPhoto=uploadPhoto;
module.exports.searchPhotoByName=searchPhotoByName