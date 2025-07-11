import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctordashData = () => {

  const {dashData, getDashData, dToken, cancelAppointment, completeAppointment} = useContext(DoctorContext)
  const {calculateAge,slotDateFormat} = useContext(AppContext)

  useEffect(()=>{
    if(dToken){
      getDashData()
      console.log(dashData)
    }
  },[dToken])

  return dashData && (
    <div className="px-4 py-6 space-y-6">
    
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Earnings */}
        <div className="flex items-center gap-4 bg-white shadow rounded-xl p-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <img src={assets.earning_icon} alt="" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">₹ {dashData.earnings}</p>
            <p className="text-sm text-gray-500">Earnings</p>
          </div>
        </div>
    
        {/* Patients */}
        <div className="flex items-center gap-4 bg-white shadow rounded-xl p-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <img src={assets.patients_icon} alt="" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">{dashData.patients}</p>
            <p className="text-sm text-gray-500">Patients</p>
          </div>
        </div>
    
        {/* Appointments */}
        <div className="flex items-center gap-4 bg-white shadow rounded-xl p-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">{dashData.appointments}</p>
            <p className="text-sm text-gray-500">Appointments</p>
          </div>
        </div>
      </div>
    
      {/* Latest Appointments Section */}
      <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Latest Appointments</h2>
      
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 text-left">#</th>
                    <th className="py-2 px-4 text-left">Patient</th>
                    <th className="py-2 px-4 text-left">Payment</th>
                    <th className="py-2 px-4 text-left">Age</th>
                    <th className="py-2 px-4 text-left">Date & Time</th>
                    <th className="py-2 px-4 text-left">Fees</th>
                    <th className="py-2 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dashData?.latestAppointments?.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b hover:bg-blue-50`}
                    >
                      <td className="py-2 px-4">{index+1}</td>
                      <td className="py-2 px-4 flex items-center gap-2">
                        <img src={item.userData.image} alt="" className="w-6 h-6 rounded-full" />
                        <span>{item.userData.name}</span>
                      </td>
                      <td className="py-2 px-4">
                        <span className="border border-gray-400 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                          {item.payment ? 'Online' : 'Cash'}
                        </span>
                      </td>
                      <td className="py-2 px-4">{calculateAge(item.userData.dob)}</td>
                      <td className="py-2 px-4">{slotDateFormat(item.slotDate)}, {item.slotTime}</td>
                      <td className="py-2 px-4">₹ {item.amount}</td>
      
                      {
                        !item.isCompleted && !item.cancelled  &&
                        <td className="py-2 px-4 flex gap-2">
                          <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt=""  className='w-10 cursor-pointer'/>
                          <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" className='w-10 cursor-pointer'/>
                        </td>
                      }
                      {
                        item.cancelled && 
                        <td className="py-2 px-4 flex gap-2">
                          <button className='bg-red-200 text-red-600 rounded-full p-2'>Cancelled</button>
                        </td>
                      }
                      {
                        item.isCompleted &&
                        <td className="py-2 px-4 flex gap-2">
                          <button className='bg-green-200 text-green-600 rounded-full p-2'>Completed</button>
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    
    </div>
  )
}

export default DoctordashData
