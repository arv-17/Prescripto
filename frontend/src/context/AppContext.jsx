import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext();

export const AppProvider = ( props ) => {

    const [doctors,setDoctors] = useState([]);
    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData,setUserData] = useState({})

    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getDoctorsData = async()=>{

        try {

            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message);
            }

            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async()=>{
        try {

            const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers : {token}})

            if(data.success){
                setUserData(data.userData)
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
        getDoctorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
            setUserData({})
        }
    },[token])

    const value = {
        doctors,getDoctorsData,currencySymbol,token,setToken,backendUrl,
        userData,loadUserProfileData,setUserData
    }

    return (

        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    );
};