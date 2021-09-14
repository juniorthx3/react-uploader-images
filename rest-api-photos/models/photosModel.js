const mongoose=require("mongoose");

const {Schema}=mongoose;

const photoSchema=new Schema({
   filename: {type:String, required:true},
   size:{type:String, required:true},
   created_at:{type:Date, default:Date.now}
})

const Photos=mongoose.model("Photo", photoSchema);

module.exports={ Photos }