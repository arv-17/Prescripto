import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAToken, backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async(event)=>{
        event.preventDefault()

        try {

            if(state === 'Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if(data.success){
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)
                }
                else{
                    toast.error(data.message)
                }
            }
            else{
                const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
                if(data.success){
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token)
                }
                else{
                    toast.error(data.message)
                }
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }

    return (
        <form onSubmit={(e)=>onSubmitHandler(e)} className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-sm sm:max-w-md px-6 py-8 sm:px-10">
                <p className="text-center text-xl sm:text-2xl font-semibold mb-6">
                    <span className="text-primary">{state}</span> <span className="text-gray-700">Login</span>
                </p>
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <input 
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        type="email" 
                        required 
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                </div>
                <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-1">Password</p>
                    <input
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        type="password" 
                        required 
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                </div>
                <button 
                    className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition text-sm sm:text-base"
                >
                    Login
                </button>
                {
                    state === 'Admin' 
                    ? (
                        <p className="text-center mt-4 text-sm text-gray-600">
                            Doctor Login? <span 
                                onClick={() => setState('Doctor')} 
                                className="text-primary cursor-pointer underline"
                            >Click here</span>
                        </p>
                    ) : (
                        <p className="text-center mt-4 text-sm text-gray-600">
                            Admin Login? <span 
                                onClick={() => setState('Admin')} 
                                className="text-primary cursor-pointer underline"
                            >Click here</span>
                        </p>
                    )
                }
            </div>
        </form>
    )
}

export default Login;
