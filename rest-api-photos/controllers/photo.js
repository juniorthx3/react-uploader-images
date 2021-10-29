const { Photos }=require("../models/photo");
const mongoose=require("mongoose");
const Grid=require("gridfs-stream");

const showPhoto=(req, res)=>{
    Photos.find((err, data)=>{
        if(err){
           console.log(err);
        }else{
          res.send(data);
        }
     });
};

const uploadPhoto=(req, res)=>{
    if(req.file === undefined) return res.send("Sélectionner une photo");
    const record=new Photos({
        filename: req.file.filename,
        url: "http://localhost:4000/photo/" + req.file.filename,
        mimetype:req.file.mimetype,
        encoding:req.file.encoding,
        size:req.file.size,
        photos:req.file.photos
    })
    record.save((err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data)
        }
    })
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

let gfs;
const connection=mongoose.connection;
connection.once("open", function(){
    gfs=Grid(connection.db, mongoose.mongo);
    gfs.collection("photos");

});

const showPhotoByFilename=(req, res)=>{
    // const {filename}=req.params;
    // Photos.findOne({filename:filename},(err, data)=>{
    //     if(err){
    //        console.log(err);
    //     }else{
    //       res.send(data);
    //     }
    //  })
    try{
        const file=gfs.files.findOne({filename:req.params.filename});
        const readStream=gfs.createReadStream(file);
        readStream.pipe(res);
    }
    catch(error){
         res.send("Not found");
    }
}

module.exports.showPhoto=showPhoto;
module.exports.uploadPhoto=uploadPhoto;
module.exports.showPhotoById=showPhotoById;
module.exports.showPhotoByFilename=showPhotoByFilename;