const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/cloudinary');
require('dotenv').config();

cloudinary.config(cloudinaryConfig);

async function upload(path, type) {
  try {
    let uploadResult;
    if (type === 'image') {
      uploadResult = await cloudinary.uploader.upload(path, { resource_type: 'image' });
    } else if (type === 'video') {
      uploadResult = await cloudinary.uploader.upload(path, { resource_type: 'video' });
    } else {
      throw new Error('Invalid media type');
    }

    console.log(uploadResult.secure_url);
    return uploadResult.secure_url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = upload;
