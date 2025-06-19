import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

  const [isEdit, setIsEdit] = useState(false)

  const {dToken, getProfileData, profileData, setProfileData, backendUrl} = useContext(DoctorContext)

  const updateProfile = async()=>{
    try {

      const updateData = {
        address : profileData.address,
        fees : profileData.fees,
        available : profileData.available
      }

      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updateData,{headers:{dToken}})

      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
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
    if(dToken){
      getProfileData()
    }
  },[dToken])

  return profileData && (
    <div className="p-4 md:p-8">
  <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden">
    
    {/* Left Section - Image */}
    <div className="md:w-1/3 flex justify-center items-center p-3 bg-gray-100">
      <img src={profileData.image} alt="Doctor" className="w-60 h-60 object-cover rounded-full shadow-md" />
    </div>

    {/* Right Section - Info */}
    <div className="md:w-2/3 p-4 space-y-4">
      {/* Name */}
      <p className="text-2xl font-semibold text-gray-800">{profileData.name}</p>
      
      {/* Degree & Speciality */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-gray-600">{profileData.degree} - {profileData.speciality}</p>
        <div className='flex'>
          <p className="text-gray-600">Experience: </p>
          <button className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
            {profileData.experience}
          </button>
        </div>
        
      </div>

      {/* About */}
      <div>
        <p className="font-medium text-gray-700">About:</p>
        <p className="text-gray-600 text-sm">{profileData.about}</p>
      </div>

      {/* Fee */}
      <p className="text-gray-800 font-semibold">
        Appointment Fee: <span className="text-green-600 font-bold">₹ {isEdit ? <input className='border border-black m-2 p-2' type="number" onChange={(e)=>setProfileData(prev=>({...prev, fees:e.target.value}))} value={profileData.fees ?? 0}/> : profileData.fees}</span>
      </p>

      {/* Address */}
      <div>
        <p className="font-medium text-gray-700">Address:</p>
        <p className="text-gray-600 text-sm">
          {isEdit ? <input className='border border-black m-2 p-2' type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address?.line1 ?? ""}/> : profileData.address?.line1}
          <br />
          {isEdit ? <input className='border border-black m-2 p-2' type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address?.line2 ?? ""}/> : profileData.address?.line2}
        </p>
      </div>

      {/* Availability Checkbox */}
      <div className="flex items-center gap-2">
        <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available ?? false} type="checkbox" id="avl" className="accent-primary w-4 h-4" />
        <label htmlFor="avl" className="text-sm text-gray-700">Available</label>
      </div>

      {/* Edit Button */}
      {
        isEdit
        ? <button onClick={updateProfile} className="border px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition">
          Save
          </button>
        : <button onClick={()=>setIsEdit(true)} className="border px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition">
          Edit
          </button>
      }
    </div>
  </div>
</div>

  )
}

export default DoctorProfile
