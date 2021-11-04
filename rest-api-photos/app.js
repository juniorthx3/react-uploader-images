const express=require("express");
const cors=require("cors");
const pictureRoutes=require("./routes/photo");
const morgan=require("morgan");
require("./models/dbConfig");

const app=express();
const PORT=process.env.PORT || 4000; 

app.use(express.json()) 
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan('dev'));
app.use("/photo", pictureRoutes);

app.get("/", (req, res)=>{
    res.json({"message":"API pour obtenir toutes les images téléchargées. Ajoutez /photos à l'URL pour voir toutes les informations sur les images téléchargés."})
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

