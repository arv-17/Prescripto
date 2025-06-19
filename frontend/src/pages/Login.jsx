import React,{useContext, useState,useEffect} from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate()

  const {setToken,token,backendUrl} = useContext(AppContext)

  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try {
      // Sign Up
      if(state === 'Sign Up') {

        const {data} = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(data.success){
          setToken(data.token)
          localStorage.setItem('token',data.token)
          toast.success("New User Registered")
        }
        else{
          toast.error(data.message)
        }
      }
      // Login
      else {

        const {data} = await axios.post(backendUrl + '/api/user/login',{email,password})
        if(data.success){
          setToken(data.token)
          localStorage.setItem('token',data.token)
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

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  

  return (
    <div>
      
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  border rounded-xl text-zinc-600 text-lg shadow-lg'>
          <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
          <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment.</p>

          {
            state === 'Sign Up' &&
            <div className='w-full'>
              <p>Username</p>
              <input className='border border-zinc-300 rounded mt-2 w-full p-3' type="text" onChange={(e) => setName(e.target.value)} value={name} required/>
            </div>
          }
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded mt-2 w-full p-3' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 rounded mt-2 w-full p-3' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
          </div>
          <button className='bg-primary w-full text-white py-2 rounded-md border text-base cursor-pointer'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
          {state === 'Sign Up' ?
            <p className='mt-2'>Already have an account? <span className='text-primary cursor-pointer underline' onClick={() => setState('Login')}>Log in</span></p> :
            <p className='mt-2'>Don't have an account? <span className='text-primary cursor-pointer underline' onClick={() => setState('Sign Up')}>Sign up</span></p>}
        </div>
      </form>
      
    </div>
  )
}

export default Login
