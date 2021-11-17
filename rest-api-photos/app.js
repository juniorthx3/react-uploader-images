const express=require("express");
const cors=require("cors");
const pictureRoutes=require("./routes/photo");
const morgan=require("morgan");
const dbConnection=require("./models/dbConfig");
require("dotenv").config();

dbConnection();
const app=express();
const PORT=process.env.PORT || 4000; 

app.use(express.json()) 
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan('dev'));
app.use("/photo", pictureRoutes);

app.get("/", (req, res)=>{
    res.json({"Summary":"API to get all uploaded images",
              "Retrieve metadata of all photos stored in the database":"http://localhost:4000/photo",
              "Retrieve metadata of one specific photo using the ID":"http://localhost:4000/photo/view/id/[ID]",
              "Streaming the file with the given ID from GridFS":"http://localhost:4000/photo/display/id/[ID]",
              "Retrieve metadata of one specific photo using the filename":"http://localhost:4000/photo/view/name/[filename]",
              "Streaming the file with the given name from GridFS":"http://localhost:4000/photo/display/name/[filename]"
            });
});

app.use((req, res, next)=>{
    const error=new Error('Invalid URL parameter...');
    error.status=404;
    next(error);
})
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({message:error.message})
})

app.listen(PORT, ()=>{
    console.log(`Server started on localhost port ${PORT}`)
});

module.exports=app;

