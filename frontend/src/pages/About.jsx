import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center mt-10 mb-5 text-2xl pt-8'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='flex flex-col md:flex-row gap-12'>
        <img className="w-full md:max-w-[360px]" src={assets.about_image} alt="" />
        <div className='flex flex-col gap-4 text-gray-700 text-md gap-6 md:w-2/4 justify-center'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi nisi officiis harum eos cumque possimus beatae est velit corrupti voluptas. Lorem ipsum dolor sit amet.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus laboriosam commodi similique harum dicta veritatis mollitia, odit, quia maxime nesciunt minus, omnis minima aliquam ipsum!</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sapiente voluptates eos qui laudantium tenetur culpa nihil numquam eius laboriosam dolorem tempora accusantium facere repellendus ratione, incidunt cupiditate, tempore odio?</p>
        </div>
      </div>

      <div className='text-xl my-8'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-10 md:w-1/3 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300'>
          <b>Efficiency:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nisi officiis harum eos cumque possimus beatae est</p>
        </div>
        <div className='border px-10 md:px-16 py-10 md:w-1/3 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300'>
          <b>Convenience:</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus laboriosam commodi similique harum dicta veritatis</p>
        </div>
        <div className='border px-10 md:px-16 py-10 md:w-1/3 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300'> 
          <b>Personalization:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sapiente voluptates eos qui laudantium tenetur</p>
        </div>
      </div>
      
    </div>
  )
}

export default About
