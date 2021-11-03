const express=require("express");
const router=express.Router();
const upload=require("../middleware/upload");
const {showPhoto, uploadPhoto, showPhotoById, showPhotos}=require("../controllers/photo");

//Routes
router.get("/", showPhoto);
router.post("/", upload.single('photos'), uploadPhoto);
router.get("/:id", showPhotoById);
router.get("/files", showPhotos);

module.exports = router