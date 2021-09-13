const express=require("express")
const app=express();
const morgan=require("morgan");
const bodyParser=require("body-parser");
require("./models/dbConfig");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Contrnt-Type, Accept, Authorization');
  if(req.method === 'OPTIONS'){
    req.header('Access-Control-Allow-Methods',"PUT, POST, PATCH, DELETE, GET") ;
    return res.status(200).json({})
  }
})

const pictureRoutes=require("./routes/pictures");

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
