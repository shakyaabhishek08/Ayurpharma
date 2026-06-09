import React from 'react'
import AboutImg from '../assets/about.jpeg';


const About = () => {
  return (
    <div>
         <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>ABOUT<span className='text-gray-700 font-medium'> US </span></p>
         </div>
         <div className='my-10 flex flex-col md:flex-row gap-12'>
            <img  className='w-full md:max-w-[360px] rounded-lg' src={AboutImg}/>
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
              <p>Welcome to Ayupharma,Your trusted in managing Your Healthcare Needs Conveniently And Efficiently.At AyuPharma,we understand the challenges individuals faces when it comes to scheduling Doctor Appointments And Managing Their Health Records.</p>
              <p>AyuPharma is Committed to Excellence in Healthcare Technology.We Continuously Strive to Enhance Our platform,Integrating the Latest Advancement to Improve User Experience And Deliver Superior Service.Whether you are booking Your First Appointment or Managing Ongoing Care,AyuPharma is Here to Support You every Step of the Way</p>
              <b className='text-gray-800'>Our Vision</b>
              <p>Our Vision at Ayupharma is to create a Seamless Healthcare Experience For Every User.we Aim To Bridge The Gap Between Patient And Healthcare Providers,Making it Easier For You To Access The Care You Need,When You Need it.
              </p>
            </div>
         </div>
         <div className='text-xl my-4'>
          <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
         </div>
         <div className='flex flex-col md:flex-row mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
            <b>Efficiency:</b>
            <p >Streamlined appointment scheduling that fits into your busy lifestyle</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
               <b>Convenience</b>
               <p>Access to a network of trusted healthcare professionals in your area</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                 <b>Personalization:</b>
                 <p>Tailored recommendations and reminders to help you stay on the top of your health.</p>
          </div>
         </div>
    </div>
  )
}

export default About