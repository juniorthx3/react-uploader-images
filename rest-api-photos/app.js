const express=require("express")
const app=express();
const morgan=require("morgan");
const bodyParser=require("body-parser");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

const pictureRoutes=require("./api/routes/pictures");

app.use("/pictures", pictureRoutes);

app.use((req, res, next)=>{
    const error=new Error('Page Not found');
    error.status=404;
    next(error);
})

app.use((error, req, res, nex)=>{
    res.status(error.status || 500);
    res.json({message:error.message})
})

module.exports=app;
