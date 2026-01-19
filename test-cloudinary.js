require('dotenv').config();
const cloudinary = require('./config/cloudinary');

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      { resource_type: 'image' }
    );

    console.log('✅ Upload successful');
    console.log(result.secure_url);
  } catch (error) {
    console.error('❌ Upload failed');
    console.error(error);
  }
}

testUpload();
