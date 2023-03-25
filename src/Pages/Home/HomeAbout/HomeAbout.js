import React from 'react';
import img from '../../../assets/images/About/dealership.jpg'
import {FaCheck } from 'react-icons/fa';

const HomeAbout = () => {
    return (
        <div className='lg:flex'>
            <div className='lg:w-1/2 md:w-1/2 w-12/12' style={{ backgroundImage: `url(${img})`}}>
                <img className='lg:hidden' src={img} alt="" />
            </div>
            <div className='lg:w-1/2 md:w-1/2 w-12/12'>
                <div className='lg:p-20 px-4 py-10'>
                    <h2 className="text-4xl font-extrabold mb-6">About Us</h2>
                    <p className='text-xl font-semibold mb-7 lg:w-8/12'>How the adventure ended will be seen anon. Aouda was anxious, though she said nothing.</p>
                    <p className='text-xl mb-7 lg:w-11/12'>As for Passepartout, he thought Mr. Fogg’s manoeuvre simply glorious. The captain had said “between eleven and twelve knots,” and the Henrietta confirmed his prediction. How the adventure ended will be seen anon. Aouda was anxious, though she said nothing.</p>
                    <div>
                        <p className='text-lg font-semibold mb-3'><FaCheck className='text-white inline bg-secondary rounded-full p-1'></FaCheck> Quality Cars at Guaranteed Prices</p>
                        <p className='text-lg font-semibold mb-3'><FaCheck className='text-white inline bg-secondary rounded-full p-1'></FaCheck> Routine Service Available</p>
                        <p className='text-lg font-semibold mb-3'><FaCheck className='text-white inline bg-secondary rounded-full p-1'></FaCheck> Turn Your Product Into Cash</p>
                    </div>
                    <button className='py-2 px-5 text-lg font-semibold bg-secondary text-white rounded-lg mt-3 hover:bg-[#C20095]'>About us</button>
                </div>
            </div>
        </div>
    );
};

export default HomeAbout;