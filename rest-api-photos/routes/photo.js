const express=require("express");
const router=express.Router();
const {showPhotos, uploadPhoto, searchPhotoById, displayPhotoById}=require("../controllers/photo");
const upload=require("../middleware/upload");

//Routes
router.get("/", showPhotos);
router.post("/", upload.single('photos'), uploadPhoto);
router.get("/view/:id", searchPhotoById);
router.get("/display/:id", displayPhotoById);


module.exports = router