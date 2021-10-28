const multer=require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
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

//Create Storage Engine
const storage=new GridFsStorage({
    url:process.env.MONGO_URI,
    options:{useNewUrlParser:true, useUnifiedTopology:true},
    file:(req, file)=>{
        const match=["image/png", "image/jpeg", "image/jpg"];
        const dateStr = new Date().toISOString().replace(/:/g, '-');
        if(match.indexOf(file.mimetype)=== -1){
            const filename=`${dateStr}-${file.originalname}`;
            return filename;
        }
        return {
            bucketName:"photos",
            filename:`${dateStr}-${file.originalname}`
        }
    }
});

const upload=multer({storage});   

module.exports=upload;