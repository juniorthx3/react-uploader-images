const mongoose=require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology:true, useNewUrlParser:true}, err=>{
    if(err){
        console.log("Error Establishing a Database Connection", err)
    }else{
        console.log("Database Connection Successfully!");
    }
    
})