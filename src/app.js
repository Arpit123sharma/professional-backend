import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app =express();

app.use(cors({
    origin:process.env.CORS_ORIGION,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

// import routes here
import userRoute from "./routes/user.route.js"


//use route here
app.use("/api/v1/users",userRoute)

export {app}