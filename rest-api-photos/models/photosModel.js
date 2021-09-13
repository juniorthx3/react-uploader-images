const mongoose=require("mongoose");

const PhotosModel=mongoose.model({
   _id:String,
   filename: {type:String, required:true},
   size:{type:Number, required:true},
   created_at:{type:Date, default:Date.now}
})

module.exports={ PhotosModel }