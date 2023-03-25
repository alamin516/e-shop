import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/error-image/1.jpg';
import img1 from '../../assets/images/error-image/2.gif';


const ErrorPage = () => {
    return (
        <div className='container flex justify-center py-24 px-4'>
            <div>
                <img src={img} alt="" />
                <h2 className='lg:text-4xl text-2xl text-primary font-semibold my-6 text-center'>Did not find what you were looking for?</h2>
                <div className='text-center'>
                    <img className='mx-w-full mx-auto' src={img1} alt="" />
                    <h5 className='text-xl lg:mb-0  mt-5'>You can try to: <Link to='/'><button className='btn btn-secondary px-10'>Home</button></Link></h5>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;