const mongoose=require("mongoose");

const {Schema}=mongoose;

const photoSchema=new Schema({
   filename:String,
   desc:String,
   img:{data:Buffer, contentType:String}
})

const Photos=mongoose.model("Photo", photoSchema);

module.exports={ Photos }