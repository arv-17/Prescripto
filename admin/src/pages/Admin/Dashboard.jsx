import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const Dashboard = () => {
  const {
    dashboard,
    setDashboard,
    getAdminDashboard,
    cancelAppointment,
    aToken,
  } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAdminDashboard();
    }
  }, [aToken]);

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Doctors */}
        <div className="flex items-center gap-4 bg-white shadow rounded-xl p-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <img src={assets.doctor_icon} alt="Doctors" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {dashboard.doctors}
            </p>
            <p className="text-sm text-gray-500">Doctors</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-4 bg-white shadow rounded-xl p-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <img
              src={assets.patients_icon}
              alt="Patients"
              className="w-6 h-6"
            />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {dashboard.patients}
            </p>
            <p className="text-sm text-gray-500">Patients</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-4 bg-white shadow rounded-xl p-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <img
              src={assets.appointment_icon}
              alt="Appointments"
              className="w-6 h-6"
            />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {dashboard.appointments}
            </p>
            <p className="text-sm text-gray-500">Appointments</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className="w-full max-w-4xl bg-white shadow rounded-xl border border-blue-200 p-4 sm:p-6 mx-auto">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Latest Appointment
        </h3>

        <ul className="divide-y divide-gray-100">
          {dashboard.latestAppointments?.map((item, index) => (
            <li key={index} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <img
                  src={item.docData.image}
                  alt="Doctor"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.docData.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>
              </div>
              {
              !item.cancelled && !item.isCompleted && (
                <div className="flex justify-center">
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 hover:bg-red-200 p-4 rounded-full text-3xl"
                  >
                    &times;
                  </button>
                </div>
              )
              }

              {
              item.cancelled && !item.isCompleted && (
                <button className="bg-red-200 text-red-600 text-md hover:bg-red-200 p-3 rounded-4xl">
                  Cancelled
                </button>
              )}

              {!item.cancelled && item.isCompleted && (
                <button className="bg-green-200 text-green-600 text-md hover:bg-green-200 p-3 rounded-4xl">
                  Completed
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
