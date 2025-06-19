import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive directory of top-rated doctors.</p> 

        <div className='w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((doctor, index) => (
                <div onClick={() => navigate(`/appointment/${doctor._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" key={index}>
                    <img className="bg-blue-50 " src={doctor.image} alt={doctor.name} />
                    <div className='p-4 '>
                      <div className={`flex items-center gap-2 text-sm text-center ${doctor.available ? 'text-green-500' : 'text-gray-500'} `}>
                        <p className={`w-2 h-2 ${doctor.available ? 'bg-green-500' :  'bg-gray-500'}  rounded-full`}></p><p>{doctor.available ? 'Available' : 'Not Available'}</p>
                      </div>
                      <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
                      <p className='text-gray-700 text-sm'>{doctor.speciality}</p>
                    </div>
                </div>
                ))}
        </div>
          <button onClick={() => navigate('/doctors')} className='bg-blue-50 text-gray-600 text-lg py-3 px-12 rounded-full mt-10 cursor-pointer border-none'>more</button>
    </div>
  )
}

export default TopDoctors
