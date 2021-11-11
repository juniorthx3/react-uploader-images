const express=require("express");
const router=express.Router();
const {showPhotos, uploadPhoto, searchPhotoById, displayPhotoById, searchPhotoByFilename, displayPhotoByFilename}=require("../controllers/photo");
const upload=require("../middleware/upload");

//Routes
router.get("/", showPhotos);
router.post("/", upload.single('photos'), uploadPhoto);
router.get("/view/id/:id", searchPhotoById);
router.get("/display/id/:id", displayPhotoById);
router.get("/view/name/:filename", searchPhotoByFilename);
router.get("/display/name/:filename", displayPhotoByFilename);

module.exports = router