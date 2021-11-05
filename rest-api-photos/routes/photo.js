const express=require("express");
const router=express.Router();
const {showPhotos, uploadPhoto, searchPhotoByName, displayPhoto, allPhotos}=require("../controllers/photo");
const upload=require("../middleware/upload");


//Routes
router.get("/", showPhotos);
router.post("/", upload.single('photos'), uploadPhoto);
router.get("/view/:filename", searchPhotoByName);
router.get("/display/:filename", displayPhoto);
router.get("/all", allPhotos);

module.exports = router