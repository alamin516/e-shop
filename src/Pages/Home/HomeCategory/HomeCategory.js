import React from 'react';
import { Link } from 'react-router-dom';

const HomeCategory = ({ category }) => {
    const { category: name, categoryImg, _id } = category;


    return (
        <div className="card bg-base-100 hover:shadow-xl rounded-lg">
            <div className="card-body p-0">
                <Link to={`/category/${_id}`}> <img src={categoryImg} alt="" /></Link>
                <div className="card-actions justify-center py-5">
                    <div>
                        <h1 className='text-2xl mb-6 text-center font-bold'>{name}</h1>
                        <Link to={`/category/${_id}`}><button className="btn btn-secondary w-full">View</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCategory;