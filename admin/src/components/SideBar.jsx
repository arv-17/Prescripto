import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const SideBar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext);

  return (
    <div className='min-h-scren bg-white border-r'>

        {
            aToken && <ul className='mt-5 text-[#515151]'>

                <NavLink to={'/admin-dashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : '' }`}>
                    <img src={assets.home_icon} alt="" />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink to={'/all-appointments'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : '' }`} >
                    <img src={assets.appointment_icon} alt="" />
                    <p>Appointments</p>
                </NavLink>

                <NavLink to={'/add-doctor'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : '' }`}>
                    <img src={assets.add_icon} alt="" />
                    <p>Add Doctor</p>
                </NavLink>

                <NavLink to={'doctor-list'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : '' }`}>
                    <img src={assets.people_icon} alt="" />
                    <p>Doctors List</p>
                </NavLink>

            </ul>
        }

        {
            dToken && <ul className='mt-5 text-[#515151]'>

                <NavLink to={'/doctor-dashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : '' }`}>
                    <img src={assets.home_icon} alt="" />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink to={'/doctor-appointments'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : '' }`} >
                    <img src={assets.appointment_icon} alt="" />
                    <p>Appointments</p>
                </NavLink>

                <NavLink to={'doctor-profile'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-2 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : '' }`}>
                    <img src={assets.people_icon} alt="" />
                    <p>Profile</p>
                </NavLink>

            </ul>
        }
      
    </div>
  )
}

export default SideBar
