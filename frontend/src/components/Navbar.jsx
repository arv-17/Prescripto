import { React, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {token,setToken,userData} = useContext(AppContext)

  const navigate = useNavigate();

  const logout = ()=>{
    setToken('')
    localStorage.removeItem('token')
  }

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 border-b shadow-sm relative bg-white z-30 mb-6">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className="w-24 sm:w-32 md:w-44 cursor-pointer"
      />

      {/* Toggle Menu Icon for Small Screens */}
      <div className="md:hidden">
        <button
          aria-label="Toggle menu"
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 rounded-md hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <img
            src={assets.menu_icon}
            alt="menu"
            className="w-7 h-7"
          />
        </button>
      </div>

      {/* Main Nav Links (Medium and up) */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative px-2 py-1 font-medium text-black text-sm sm:text-base md:text-base transition duration-200 ${
              isActive ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:w-full" : ""
            }`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `relative px-2 py-1 font-medium text-black text-sm sm:text-base md:text-base transition duration-200 ${
              isActive ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:w-full" : ""
            }`
          }
        >
          ALL DOCTORS
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative px-2 py-1 font-medium text-black text-sm sm:text-base md:text-base transition duration-200 ${
              isActive ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:w-full" : ""
            }`
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `relative px-2 py-1 font-medium text-black text-sm sm:text-base md:text-base transition duration-200 ${
              isActive ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:w-full" : ""
            }`
          }
        >
          CONTACT
        </NavLink>
      </div>

      {/* Right Side Account Section (Medium and up) */}
      <div className="hidden md:flex items-center">
        {token && userData? (
          <div className="flex items-center gap-2 md:gap-3 relative group cursor-pointer">
            <img
              src={userData.image}
              alt="profile_pic"
              className="w-8 h-15  sm:w-10 md:w-12 lg:w-14 rounded-full object-cover"
            />
            <img src={assets.dropdown_icon} alt="" className="w-3" />
            <div className="absolute right-0 top-0 shadow-lg rounded-lg pt-14 text-sm font-medium text-gray-500 z-20 hidden group-hover:block">
              <div className="min-w-44 bg-stone-100 rounded flex flex-col gap-3 p-4">
                <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('login')}
            className="cursor-pointer px-4 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition duration-200"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Dropdown Panel */}
      {showMenu && (
        <div className="absolute top-20 left-0 w-full bg-white flex flex-col items-start px-6 py-4 space-y-4 shadow-md md:hidden z-50">
          <NavLink
            to="/"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `relative px-2 py-1 font-medium text-black text-sm sm:text-base md:text-base transition duration-200 ${
                isActive ? "bg-primary text-white rounded-md" : ""
              }`
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/doctors"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `relative px-2 py-1 font-medium text-black text-sm sm:text-base md:text-base transition duration-200 ${
                isActive ? "bg-primary text-white rounded-md" : ""
              }`
            }
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `relative px-2 py-1 font-medium text-black text-sm sm:text-base md:text-base transition duration-200 ${
                isActive ? "bg-primary text-white rounded-md" : ""
              }`
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `relative px-2 py-1 font-medium text-black text-sm sm:text-base md:text-base transition duration-200 ${
                isActive ? "bg-primary text-white rounded-md" : ""
              }`
            }
          >
            CONTACT
          </NavLink>
          {token ? (
            <>
              <p
                onClick={() => {
                  navigate('/my-profile')
                  setShowMenu(false)
                }}
                className="cursor-pointer px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors"
              >
                My Profile
              </p>
              <p
                onClick={() => {
                  navigate('/my-appointments')
                  setShowMenu(false)
                }}
                className="cursor-pointer px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors"
              >
                My Appointments
              </p>
              <p
                onClick={() => {
                  setToken(false)
                  setShowMenu(false)
                }}
                className="cursor-pointer px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors"
              >
                Logout
              </p>
            </>
          ) : (
            <button
              onClick={() => {
                navigate('login')
                setShowMenu(false)
              }}
              className="px-4 py-2 bg-primary text-white rounded-full"
            >
              Create Account
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
