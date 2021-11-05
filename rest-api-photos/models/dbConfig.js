const mongoose=require("mongoose")

module.exports=async function dbConnection(){
    try{
       await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true}, ()=>{
         console.log("Database Connection Successfully!");
       });
    }
    catch(err){
        console.log("Error Establishing a Database Connection");
        console.log(err);
    }
}