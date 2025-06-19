import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'


//API for adding a doctor
const addDoctor=async (req,res)=>{
    try {
        const {name,email,password,speciality,degree,fees,about,address,experience} = req.body;
        const imageFile = req.file;

        if(!name || !email || !password || !speciality || !degree || !fees || !about || !address || !experience){
            return res.json({success:false, message:"Missing Details"});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong password"})
        }
        
        // hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            password:hashedPassword,
            image:imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            date:Date.now(),
            address:JSON.parse(address)
        }

        const newDoctor = await doctorModel.create(doctorData);

        return res.json({success:true, message:"Doctor added successfully"});

    }
    catch(error) {
        console.log(error)
        return res.json({success:false, message:error.message});
    }
     
}

//API for admin login
const loginAdmin = async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign({email:process.env.ADMIN_EMAIL,password:process.env.ADMIN_PASSWORD},process.env.JWT_SECRET);
            return res.json({success:true,token});
        }
        else{
            return res.json({success:false,message:"Invalid Credentials"})
        }
    }   
    catch(error) {
        console.log(error)
        return res.json({success:false, message:error.message});
    }
}

//API to get all doctors list for admin panel
const allDoctors = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const appointmentsAdmin = async(req,res)=>{
    try {

        const appointments = await appointmentModel.find({})

        return res.json({success:true,appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// API to cancel appointment by admin
const cancelAppointment = async(req,res)=>{
    try {

        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled : true})

        //release the doctor slots
        const {docId,slotDate,slotTime} = appointmentData

        const docData = await doctorModel.findById(docId)

        let slots_booked = docData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!==slotTime)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        return res.json({success:true,message:"Appointment Cancelled"})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async(req,res)=>{
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors : doctors.length,
            patients : users.length,
            appointments : appointments.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }

        return res.json({success:true,dashData})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}


export {addDoctor,loginAdmin, allDoctors,appointmentsAdmin,cancelAppointment,adminDashboard};
