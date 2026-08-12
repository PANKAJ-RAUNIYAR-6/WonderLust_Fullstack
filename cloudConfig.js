const cloudinary=require('cloudinary').v2;
const { CloudinaryStorage }=require('multer-storage-cloudinary');

//this help send detail of cloude fron .env
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// storage of cloudinary 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wonderLust_DEV',  //folder name where the data are save
        allowed_Formats: ["png", "jpg", "jpeg"], //supports process as well
    },
});

// console.log({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET ? "FOUND" : "NOT FOUND",
// });

module.exports={
    cloudinary,
    storage
};