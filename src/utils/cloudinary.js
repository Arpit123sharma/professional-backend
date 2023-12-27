import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


const uploadOnCloudinary = async function(localfilepath){
    try{
      if(!localfilepath) return "didn't find file path";
      
      const response = await cloudinary.uploader.upload(localfilepath,{
        resource_type:"auto"
      })
      console.log("file uploaded on cloudinary: ",response.url);
      return response;
    }
    catch{
      fs.unlinksync(localfilepath);
      return null;
    }
}



export {uploadOnCloudinary};
