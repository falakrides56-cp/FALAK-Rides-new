import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'p4lbzxfc',
  api_key: process.env.CLOUDINARY_API_KEY || '273411346925389',
  api_secret: process.env.CLOUDINARY_API_SECRET || '-YWw9grINo4Zat_rW_w2gOomR1E',
  secure: true,
});

export default cloudinary;
