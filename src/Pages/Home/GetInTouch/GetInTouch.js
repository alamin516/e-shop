import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../../assets/images/img/phone.webp'

const GetInTouch = () => {
    return (
        <div className="hero py-20" style={{ backgroundImage: `url(${img})` }}>
            <div className="hero-content container lg:w-1/4">
                <div className="card flex-shrink-0 r-12 w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h2 className='text-2xl font-semibold mb-10'>Want to add your product in our listing?</h2>
                        <div className="form-control">
                            <input type="phone" placeholder="Enter Your Phone Number" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-secondary">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;