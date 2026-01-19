const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const fileModel = require('../models/files.model');
const authmiddleware = require('../middlewares/authe');
const cloudinary = require('../config/cloudinary'); 

router.get('/', authmiddleware, async (req, res) => {
  const userFiles = await fileModel.find({
    user: req.user.userId
  });

  res.render('index', { files: userFiles });
});

router.post('/upload', authmiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const resourceType = req.file.mimetype.startsWith('image/')
    ? 'image'
    : req.file.mimetype.startsWith('video/')
    ? 'video'
    : req.file.mimetype.startsWith('pdf/')
    ? 'pdf'
    : 'raw';

  await fileModel.create({
    path: req.file.path,
    originalName: req.file.originalname,
    publicId: req.file.filename,
    resourceType: resourceType, 
    user: req.user.userId
  });

  res.redirect('/');
});


router.post('/delete/:id', authmiddleware, async (req, res) => {
  try {

    const file = await fileModel.findById(req.params.id);

    if (!file) {
      return res.status(404).send('File not found');
    }


    if (file.user.toString() !== req.user.userId) {
      return res.status(403).send('Unauthorized');
    }


    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: file.resourceType
    });


    await fileModel.findByIdAndDelete(req.params.id);

    res.redirect('/');
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).send('Deletion failed');
  }
});

module.exports = router;
