const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer.js");
const fileModel = require("../models/files.model.js");
const authmiddleware = require("../middlewares/authe.js");

router.get('/', authmiddleware,async(req,res)=>{
    const userFiles = await fileModel.find({
        user: req.user.userId
    });
    console.log(userFiles);
    
    res.render('index',{
        files: userFiles
    });
})

router.post("/upload",authmiddleware, upload.single("file"),async (req, res) => {
    const fileData = await fileModel.create({
        path: req.file.path,
        originalName: req.file.originalname,
        user: req.user.userId
    });
    res.json(fileData);
    
})

module.exports = router;