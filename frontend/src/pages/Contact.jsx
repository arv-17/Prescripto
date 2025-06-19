import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center mt-10 mb-5 text-2xl pt-8'>
        <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='flex flex-col md:flex-row gap-12'>
        <img className="w-full md:max-w-[360px]" src={assets.contact_image} alt="" />

        <div className='flex flex-col gap-4 md:w-2/4 justify-center items-start'>
          <p className='font-semibold text-lg'>Our Office</p>
          <p className='text-gray-600'>Building : 171, Income Tax Colony <br /> Old Jalna, Maharashtra</p>
          <p className='text-gray-600'>Tel: +91-123-456-7890 <br />Email: atharvwrade@gmail.com</p>
          <p className='font-semibold text-lg'>Careers at PRESCRIPTO</p>
          <p className='text-gray-600'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-md cursor-pointer hover:bg-black hover:text-white transition-all duration-300'>Explore Jobs</button>
        </div>
      </div>
      
    </div>
  )
}

export default Contact
