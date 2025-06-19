import React, { useContext } from 'react'
import { useState } from 'react';
import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets.js'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {

  const {userData,setUserData,backendUrl,token,loadUserProfileData} = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

  const updateUserProfileData = async()=>{
    try {
      
      const formData = new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('dob',userData.dob)
      formData.append('gender',userData.gender)
      formData.append('address',JSON.stringify(userData.address || { line1: '', line2: '' }))
      formData.append('email',userData.email)
      
      image && formData.append('image',image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})

      if(data.success){
        toast.success(data.message)

        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }
      else{
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-md rounded'>
        {
          isEdit 
          ? <label htmlFor='image' >
              <div className='w-40 h-40 rounded-full overflow-hidden inline-block relative cursor-pointer'>
                <img src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              </div>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden/>
          </label>

          : <div className='w-40 h-40 rounded-full overflow-hidden inline-block relative cursor-pointer'>
                <img className='rounded' src={userData.image} alt="" />
              </div>
        }

        <div className='flex flex-col md:flex-row items-start gap-6'>

        <div className='flex-1 w-full'>
          {
            isEdit ?
              <input
                type='text'
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className='border border-zinc-300 rounded mt-2 p-2 w-full text-xl font-semibold'
              /> :
              <p className='mt-2 text-2xl font-semibold'>{userData.name}</p>
          }

          <hr className='my-4' />

          <div>
            <p className='text-sm font-semibold text-zinc-700 underline underline-offset-4 mb-2'>CONTACT INFORMATION</p>
            <div className='space-y-1 text-md'>
              <p>Email id:</p>
              {
                isEdit ?
                  <input
                    type='email'
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className='border border-zinc-300 rounded mt-1 p-2 w-full'
                  /> :
                  <p className='text-blue-600'>{userData.email}</p>
              }

              <p>Phone:</p>
              {
                isEdit ?
                  <input
                    type='text'
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className='border border-zinc-300 rounded mt-1 p-2 w-full'
                  /> :
                  <p className='text-blue-600'>{userData.phone}</p>
              }

              <p>Address:</p>
              {
                isEdit ? (
                  <p className='space-y-1'>
                    <input
                      type='text'
                      value={userData.address?.line1 || ''}
                      onChange={(e) => setUserData({ ...userData, address: { ...userData.address, line1: e.target.value } })}
                      className='border border-zinc-300 rounded mt-1 p-2 w-full'
                    />
                    <input
                      type='text'
                      value={userData.address?.line2 || ''}
                      onChange={(e) => setUserData({ ...userData, address: { ...userData.address, line2: e.target.value } })}
                      className='border border-zinc-300 rounded mt-2 p-2 w-full'
                    />
                  </p>) :
                  (<p className='text-zinc-600'>
                    {userData.address?.line1}
                    <br />
                    {userData.address?.line2}
                  </p>)
              }
            </div>
          </div>

          <div className='mt-6'>
            <p className='text-md font-semibold text-zinc-700 underline underline-offset-4 mb-2'>BASIC INFORMATION</p>
            <div className='space-y-1 text-md'>
              <p>Gender:</p>
              {
                isEdit ?
                  <select
                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                    value={userData.gender}
                    className='border border-zinc-300 rounded mt-1 p-2 w-full'
                  >
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </select> :
                  <p>{userData.gender}</p>
              }

              <p>Birthday:</p>
              {
                isEdit ?
                  <input
                    type='date'
                    value={userData.dob}
                    onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                    className='border border-zinc-300 rounded mt-1 p-2 w-full'
                  /> :
                  <p>{userData.dob}</p>
              }
            </div>
          </div>

          <div className='mt-6'>
            {
              isEdit ?
                <button
                  onClick={updateUserProfileData}
                  className='bg-primary text-white py-2 px-5 rounded hover:opacity-90'
                >
                  Save
                </button> :
                <button
                  onClick={() => setIsEdit(true)}
                  className='border border-zinc-500 py-2 px-6 rounded hover:bg-zinc-100'
                >
                  Edit
                </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile;
