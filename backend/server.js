import express from "express";
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// app config
const app=express();
const port=process.env.PORT || 5000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors({
    origin: ['https://prescripto-admin-oj5w.onrender.com','https://prescripto-frontend-hfe6.onrender.com',
             'http://localhost:5174','http://localhost:5173'],
    credentials: true
}))


// api endpoints
app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("API working");
})

app.listen(port,()=>console.log("Server Started at PORT : ",port));
