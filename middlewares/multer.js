const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const path = require('path');

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const name = path.parse(file.originalname).name;
    const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1e9);

    return {
      folder: 'DriveApp',
      resource_type: 'auto',
      public_id: `${uniqueId}-${name}`, // ✅ unique internal ID
      overwrite: false,
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
