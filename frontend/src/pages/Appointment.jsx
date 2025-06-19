import React, { useEffect,useState,useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
    const [docInfo, setDocInfo] = useState(null);

    const navigate = useNavigate()

    const { docId } = useParams();
    const { doctors, currencySymbol, getDoctorsData, backendUrl,token } = useContext(AppContext);

    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const fetchDoctorInfo = async() => {
        const doc =  await doctors.find((doctor) => doctor._id === docId);
        setDocInfo(doc);
    }

    const getAvailableSlots = async() => {
      setDocSlots([]);

      let today = new Date();

      for(let i=0;i<7;i++) {
        //getting the current date and adding i days to it
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        //setting the time of the date with index
        let endTime = new Date();
        endTime.setDate(today.getDate()+i);
        endTime.setHours(21,0,0,0);
        
        //setting hours
        if(currentDate.getDate() === today.getDate()) {
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        }
        else{
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots = [];
        
        while(currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          const day = currentDate.getDate()
          const month = currentDate.getMonth()+1
          const year = currentDate.getFullYear()
          
          const slotDate = day + '_' + month + '_' + year
          const slotTime = formattedTime

          const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

          if(isSlotAvailable){
            timeSlots.push({
              datetime : new Date(currentDate),
              time: formattedTime
            })
          }
          
          currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes

        }
        setDocSlots(prev => [...prev,timeSlots]);
    }
  }

  
  const bookAppointment = async()=>{
    if(!token){
      toast.warn("Login to book appointment")
      return navigate('/login')
    }

    try {

      const date = docSlots[slotIndex][0].datetime

      const day = date.getDate()
      const month = date.getMonth()+1
      const year = date.getFullYear()

      const slotDate = day + '_' + month + '_' + year

      const {data} = await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getDoctorsData()
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

    useEffect(() => {
        fetchDoctorInfo();
    }, [doctors, docId]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    useEffect(() => {
      console.log(docSlots);
    }, [docSlots]);
    

  return docInfo && (
    <div className='mt-5'>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
          </div>

          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} 
              <img className='w-5' src={assets.verified_icon} alt="" />
            </p>
            <div className='flex items-center gap-2 text-gray-600 mt-1'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-sm rounded-full'>{docInfo.experience}</button>
            </div>

            <div>
              <p className='flex items-center gap-2 text-sm font-medium text-gray-800 mt-5'>About <img className='w-5' src={assets.info_icon} alt="" /></p>
              <p className='text-sm text-gray-800 max-w-[700px] mt-1'>{docInfo.about}</p>
            </div>

            <p className='text-gray-600 mt-5 font-medium'>
              Appointment Fee : <span className='text-gray-700'>{currencySymbol}{docInfo.fees}</span>
            </p>

          </div>
        </div>


        <div className='sm:ml-72 sm:pl-4 mt-5 font-medium text-gray-800'> 
          <p>Booking Slots</p>

          { /* Booking Date Slots */ }
          <div className='flex gap-3 items-center mt-4 overflow-x-scroll w-full'>
            {
              docSlots.length && docSlots.map((item, index) => (
                <div onClick={() => {setSlotIndex(index)}} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${index === slotIndex ? 'bg-primary text-white' : 'border border-gray-400'}`} key={index}>
                  <p>{daysOfWeek[index]}</p>
                  <p>{new Date().getDate()+index}</p>
                </div>
              ))
            }
          </div>

          { /* Booking Time Slots */ }
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 items-center gap-3 mt-4 px-2">
            {docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer text-center ${item.time === slotTime ? 'bg-primary text-white' : 'border border-gray-400'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button onClick={bookAppointment} className='bg-primary text-white px-6 py-5 rounded-full mt-10 cursor-pointer hover:scale-105 transition-all duration-300' disabled={!slotTime}>
          Book an Appointment
        </button>

      </div>

      {/* Related Doctors */ }
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>

    </div>
  )

}

export default Appointment;
