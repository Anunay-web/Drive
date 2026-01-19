const mongoose = require('mongoose');



const fileSchema = new mongoose.Schema({
    path:{
        type:String,
        required:[true, 'File path is required']
    },
    originalName:{
        type:String,
        required:[true, 'Original file name is required']
    },
    publicId: {
    type: String,
    required: [true, 'Cloudinary publicId is required'],
  },
  resourceType: {               
    type: String,
    required: [true, 'Cloudinary resource type is required'],
  },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User is required']
    }
})

const file = mongoose.model('file', fileSchema);
module.exports = file;