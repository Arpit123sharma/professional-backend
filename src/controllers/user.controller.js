import { asyncHandler } from "../utils/Asynchandler.js";
import {ApiError} from "../utils/apierror.js";
import {user} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/apiresponse.js";

const registerUser = asyncHandler( async (req,res)=>{
     // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullname,email,password,username}=req.body
    console.log("email: ",email);

    if(
        [fullname,email,password,username].some((field) => field?.trim()==="")
    ){
        throw new ApiError(400,`all field are required !`)
    }

    const existedUser = user.findOne({
        $or: [{username},{email}]
    })
    if (existedUser) {
        throw new ApiError(409,"username or email is already existed pls try another one")
    }
    
    const avatarfilelocalpath = req.files?.Avatar[0]?.path;
    const coverimagelocalpath = req.files?.coverImage[0]?.path;

    if(!avatarfilelocalpath){
        throw new ApiError(400,"avatar field is required")
    }
    
    const avatar = await uploadOnCloudinary(avatarfilelocalpath);
    const coverimage = await uploadOnCloudinary(coverimagelocalpath);

    if (!avatar) {
        throw new ApiError(400,"Avatar file is required")
    }
    const User = await user.create({
        fullname,
        email,
        Avatar:avatar.url,
        coverImage:coverimage?.url || "",
        username:username.toLowerCase()
    })
    const createdUser = user.findById(User._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"user was not created!")
    }
    res.status(200).json(
        new ApiResponse(200,createdUser,"user register successfully !!!")
    )

})

export default registerUser;