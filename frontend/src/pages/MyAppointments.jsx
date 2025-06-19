import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const MyAppointments = () => {

  const [appointments,setAppointments] = useState([])

  const {token, backendUrl, getDoctorsData} = useContext(AppContext);

  const navigate = useNavigate()

  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[dateArray[1]] + " " + dateArray[2]
  }

  const getUserAppointments = async()=>{
    try {

      const {data} = await axios.get(backendUrl + '/api/user/appointments',{headers:{token}})

      setAppointments(data.appointments.reverse())
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId)=>{
    try {

      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  //handle razorpay
  const initPay = (order)=>{

    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount : order.amount,
      currency : order.currency,
      name : "Prescripto",
      description : "Appointment Payment",
      order_id : order.id,
      receipt : order.receipt,
      handler : async(response)=>{
        console.log(response)
        try {

          const {data} = await axios.post(backendUrl + '/api/user/verify-razorpay',response,{headers:{token}})

          if(data.success){
            toast.success(data.message)
            getUserAppointments()
            navigate('/my-appointments')
          }
          else{
            toast.error(data.message)
          }
          
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    const rzp = new Razorpay(options)
    rzp.open()
  }

  //Payment of appointment through razorpay
  const appointmentRazorpay = async(appointmentId)=>{
    try {

      const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay',{appointmentId},{headers : {token}})

      if(data.success){
        initPay(data.order)
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <p className="text-xl font-semibold mb-4">My Appointments</p>
      <div className="space-y-6">
        {
          appointments.map((item,index)=>
            <div key={index} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-lg shadow border gap-4">
              <div className="w-35 md:w-45 flex-shrink-0 mx-auto md:mx-0">
                <img src={item.docData.image} alt="" className="w-100 rounded-md" />
              </div>
              <div className="flex-1 text-left space-y-1 w-full">
                <p className="text-lg font-semibold">{item.docData.name}</p>
                <p className="text-sm text-gray-600">{item.docData.speciality}</p>
                <p className="text-sm font-medium mt-2">Address:</p>
                <p className="text-sm text-gray-600">{item.docData.address.line1}</p>
                <p className="text-sm text-gray-600">{item.docData.address.line2}</p>
                <p className="text-sm mt-1"><span className="font-semibold">Date & Time: </span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                <div className='mt-2 text-lg'>
                  <p>₹ <span className='text-gray-700'>{item.docData.fees}</span></p>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto md:items-end">
                {
                  !item.cancelled && item.payment && !item.isCompleted &&
                  <>
                    <button className="border border-gray-500 text-blue-600 text-md px-5 py-2 rounded-md w-full md:w-auto">Paid</button>
                  </>
                }
                {
                  !item.cancelled && !item.payment && !item.isCompleted &&
                   <>
                      <button onClick={()=>appointmentRazorpay(item._id)} className="border border-gray-500 px-8 py-2 rounded-md hover:bg-primary hover:text-white transition-all duration-300 w-full md:w-auto cursor-pointer">Pay Now</button>
                      <button onClick={()=>cancelAppointment(item._id)} className="border border-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-red-600 hover:text-white transition w-full md:w-auto cursor-pointer">Cancel Appointment</button>
                  </>
                }
                {
                  item.cancelled && !item.isCompleted &&
                  <>
                    <button className='border border-gray-500 text-red-600 text-md px-5 py-2 rounded-md w-full md:w-auto'>Cancelled</button>
                  </>
                }
                {
                  item.isCompleted && 
                  <>
                    <button className='border border-gray-500 text-green-600 text-md px-5 py-2 rounded-md w-full md:w-auto'>Completed</button>
                  </>
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MyAppointments
