import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const {aToken, appointments, setAppointments, getAllAppointments,cancelAppointment} = useContext(AdminContext)
  const {calculateAge, slotDateFormat} = useContext(AppContext)

  useEffect(()=>{
    if(aToken){
      getAllAppointments()
    }
  },[aToken])

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
          All Appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Patient</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Age</th>
                <th className="px-4 py-3 text-left">Date & Time</th>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left">Fees</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {appointments?.reverse().map((appt,index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{index+1}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={appt.userData.image}
                      alt="patient"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{appt.userData.name}</span>
                  </td>
                  <td className="px-4 py-3">{appt.docData.speciality}</td>
                  <td className="px-4 py-3">{calculateAge(appt.userData.dob)}</td>
                  <td className="px-4 py-3">{slotDateFormat(appt.slotDate)},  {appt.slotTime}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={appt.docData.image}
                      alt="doctor"
                      className="w-8 h-8 rounded-full bg-gray-200"
                    />
                    <span>{appt.docData.name}</span>
                  </td>
                  <td className="px-4 py-3">₹{appt.docData.fees}</td>
                  <td className="px-4 py-3 text-center">
                    {
                      !appt.cancelled && !appt.isCompleted &&
                      <div className='flex justify-center'>
                        <button onClick={()=>cancelAppointment(appt._id)}className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 hover:bg-red-200 p-4 rounded-full text-3xl">
                        &times;
                      </button>
                    </div>
                    
                    }

                    {
                      appt.cancelled && !appt.isCompleted &&
                    <button className="bg-red-200 text-red-600 text-md hover:bg-red-200 p-3 rounded-4xl">
                      Cancelled
                    </button>
                    }

                    {
                      !appt.cancelled && appt.isCompleted &&
                    <button className="bg-green-200 text-green-600 text-md hover:bg-green-200 p-3 rounded-4xl">
                      Completed
                    </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllAppointments
