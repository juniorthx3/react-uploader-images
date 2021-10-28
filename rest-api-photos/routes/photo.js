const express=require("express");
const router=express.Router();
const upload=require("../middleware/upload");
const {showPhoto, uploadPhoto, showPhotoById, showPhotoByFilename}=require("../controllers/photo");

//Routes
router.get("/", showPhoto);
router.post("/", upload.single('photos'), uploadPhoto);
router.get("/:id", showPhotoById);
router.get("/:filename", showPhotoByFilename);

module.exports = router