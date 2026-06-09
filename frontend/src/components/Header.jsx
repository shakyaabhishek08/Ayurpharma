import React from 'react'
import { assets } from "../assets/assets";
import { MessageSquare } from 'lucide-react';

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      {/* left side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
         <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Your Ayurvedic <br/>Health Chatbot</p>
         <div className='flex flex-col md:flex-row items-start gap-3 text-white text-sm font-light'>
           {/* <img src={assets.group_profiles} className='w-28'/> */}
            <MessageSquare className="w-8 h-8 text-white" />
           <p>Ask health queries anytime,<br className='hidden sm:block'/>get trusted Ayurvedic medicine recommendations instantly</p>
         </div>
         <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 tetx-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
            Ask queries  <img src={assets.arrow_icon} className='w-3'/>
         </a>
      </div>
      {/* right side */}
      <div className='md:w-1/2 relative'>
         <img src={assets.headerImg} className='w-full md:absolute bottom-0 h-auto rounded-lg'/>
      </div>
      
    </div>
  )
}

export default Header