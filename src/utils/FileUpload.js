import { v2 as cloudinary } from cloudinary;
import fs from 'fs'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {        //upload file on cloudinary
            resource_type: "auto",
        })
        console.log("file has been uploaded successfull", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)   //remove the localy saved temporary file as the upload operation got failed
        return null
    }
}

