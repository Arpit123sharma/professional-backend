import { asyncHandler } from "../utils/Asynchandler.js";

const registerUser = asyncHandler( (req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})

export default registerUser;