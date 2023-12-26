import mongoose  from "mongoose";
import { DB_NAME } from "../constant.js";
import express from "express";

const app = express();

const connectDB = async function (){
    try{
        const connectingInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(err)=>{
            console.log("app is not able to connect with mongoDB");
            throw{err}
        })
        console.log(`mongoDB is connected !! db Host: ${connectingInstance.connection.host}`);
    }
    catch(err){
        console.log("error in connecting: ",err);
        process.exit(1);
    }
}

export default connectDB