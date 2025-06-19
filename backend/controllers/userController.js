import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

//API to register user
const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body

        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email"})
        }
        
        if(password.length < 8){
            return res.json({success:false,message:"Set a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const User = {
            name,
            email,
            password:hashedPassword
        }

        const newUser = await userModel.create(User)

        //JWT token for user
        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET)

        return res.json({success:true,token})

        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

//API to login user
const loginUser = async(req,res)=>{
    try {

        const {email,password} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
            return res.json({success:true,token})
        }
        else{
            return res.json({success:false,message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}

// API to get user profile
const getProfile = async(req,res)=>{
    try {

        const {userId} = req.body

        const userData = await userModel.findById(userId).select('-password')

        if(!userData){
            return res.json({success:false,message:"User not found"})
        }

        return res.json({success:true,userData})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

// API to update user profile
const updateProfile = async(req,res)=>{
    try {

        const {userId,name,email,phone,address,dob,gender} = req.body
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success:false,message:"Data Missing"})
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId,{name,email,phone,address:JSON.parse(address),dob,gender})
        
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }

        return res.json({success:true,message:"Details edited successfully"})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

//API to book appointment
const bookAppointment = async(req,res)=>{
    try {

        const {userId,docId,slotDate,slotTime} = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"})
        }

        let slots_booked = docData.slots_booked

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"Slot not available"})
            }
            else{
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        delete docData.slots_booked

        const userData = await userModel.findById(userId).select('-password')

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount : docData.fees,
            date : Date.now(),
            slotTime,
            slotDate
        }

        const newAppointment = await appointmentModel.create(appointmentData)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        return res.json({success:true,message:"Appointment Booked"})
        
    } catch (error) {  
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

// API to get list of user appointments
const listAppointment = async(req,res)=>{
    try {

        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        return res.json({success:true,appointments})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

// API to cancel appointment
const cancelAppointment = async(req,res)=>{
    try {

        const {userId,appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if(appointmentData.userId !== userId){
            return res.json({success:false,message:"Unauthorized action"})
        }

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

const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

// API to make payments using razorpay
const paymentRazorpay = async(req,res)=>{
    try {

        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(!appointmentData || appointmentData.cancelled){
            return res.json({success:false,message:"Appointment cancelled or not found"})
        }

        const options = {
            amount : appointmentData.amount * 100,
            currency : process.env.CURRENCY,
            receipt : appointmentId
        }

        const order = await razorpayInstance.orders.create(options)

        return res.json({success:true,order})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

// API to verify razorpay payment
const verifyRazorpay = async(req,res)=>{
    
    try {
        
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        
        console.log(orderInfo)

        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            return res.json({success:true,message:"Payment Successful!"})
        }

        return res.json({success:false,message:"Payment failed!!"})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay}