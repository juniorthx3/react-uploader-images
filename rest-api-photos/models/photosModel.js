const mongoose=require("mongoose");

const {Schema}=mongoose;

const photoSchema=new Schema({
   filename:{type:String, default:"Nouvelle Photo"},
   desc:{type:String, default:"Ajout d'une nouvelle photo par l'utilisateur"},
   photoImage:{type:String, required:true},
   dateUpload:{type:Date, default:()=>Date.now()}
 
   // img:{data:Buffer, contentType:String}
})

const Photos=mongoose.model("Photo", photoSchema);

module.exports={ Photos }