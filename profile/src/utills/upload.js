const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/cloudinary');
require('dotenv').config();

cloudinary.config(cloudinaryConfig);

async function upload(path) {
  try {
    const result = await cloudinary.uploader.upload(path);
    console.log(result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = upload;


