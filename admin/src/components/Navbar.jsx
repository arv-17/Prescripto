import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const navigate = useNavigate()

    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    const logout = () => {
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className="w-full px-4 py-2 bg-white shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src={assets.admin_logo} alt="" className="w-10 h-10 object-contain" />
                <div className="flex flex-col leading-tight">
                    <p className="text-lg font-semibold text-[#111827]">Prescripto</p>
                    <p className="text-xs text-gray-500 -mt-1">Dashboard Panel</p>
                </div>
                <p className="ml-3 px-3 py-1 border border-gray-300 text-sm rounded-full text-gray-700">{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button 
                onClick={logout}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm hover:bg-primary/90 transition"
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar
