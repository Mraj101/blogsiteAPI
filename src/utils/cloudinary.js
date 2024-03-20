const cloudinary = require('cloudinary').v2;
const fs = require("fs");


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary ", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
};

module.exports = { uploadOnCloudinary };
