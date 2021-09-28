const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const pictureRoutes=require("./routes/pictures");
const morgan=require("morgan");
require("./models/dbConfig");

const PORT=process.env.PORT || 4000;

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
app.use("/pictures", pictureRoutes); 
app.use(morgan('dev'));

app.get("/", (req, res)=>{
    res.json({"message":"API to get all uploaded images. Add /pictures to the URL to see all informations about uploading images."})
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

