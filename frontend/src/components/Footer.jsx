import React from 'react'
import { assets } from '../assets/assets'
import logo from "../assets/image.png";

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* Left Section */}
            <div>
                <img src={logo} className='mb-5 w-40'/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Book your appointment With Us .Contribute to Save Our culture</p>
            </div>

            {/* center Section */}
            <div>
                 <p className='text-xl font-medium mb-5'>COMPANY</p>
                 <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                 </ul>
            </div>

            {/* Right Section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>6387412528</li>
                    <li>ayupharma1@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* copyright */}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright Reserved@ayupharma</p>
        </div>
    </div>
  )
}

export default Footer