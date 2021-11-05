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
    res.json({"Summary":"API to get all properties of uploaded images",
              "Quick access to the properties of uploaded images":"http://localhost:4000/photo",
              "Display property of a specific image":"http://localhost:4000/photo/view/[filename]",
              "Display image on browser":"http://localhost:4000/photo/display/[filename]"
            });
});

app.use((req, res, next)=>{
    const error=new Error('Page Not found...');
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

