const mongoose=require("mongoose");

const {Schema}=mongoose;

const photoSchema=new Schema({
   filename:{type:String, default:"Nouvelle Photo"},
   mimetype:{type:String, required:true},
   url:{type:String, required:true},
   size:Number,
   encoding:String,
   dateUpload:{type:Date, default:()=>Date.now()}
})

const Photos=mongoose.model("Photo", photoSchema);

module.exports={ Photos }