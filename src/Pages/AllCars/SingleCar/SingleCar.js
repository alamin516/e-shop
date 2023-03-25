import React from 'react';
import { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import OrderModal from '../OrderModal/OrderModal';
import { FaCheck } from 'react-icons/fa';
import { useState } from 'react';

const SingleCar = () => {
    const product = useLoaderData();
    const { user } = useContext(AuthContext);
    const { _id, name, img, location, price, resale_price, description, email, seller, condition, used_time, verified_seller } = product;
    const [singleProduct, setSingleProduct] = useState(null)



    return (
        <div>
            <div className='container lg:flex lg:py-20 py-10'>
                <div className='lg:w-8/12 lg:p-0 p-4'>
                    <img src={img} alt="" />
                </div>
                <div className='lg:w-4/12 lg:pl-5 p-4'>
                    <h3 className='text-4xl font-bold mb-6'>{name}</h3>
                    <div >
                        {
                            resale_price ? <>
                                <p><span className='text-2xl font-bold'>Price:  ${resale_price} </span><del className='text-orange-500'>${price}</del></p>
                            </> :
                                <p><span className='text-xl font-bold'>Price: ${price} </span></p>
                        }
                    </div>
                    <p className='my-4 text-lg'>{description}</p>
                    <p className='mb-3'><strong>Location: </strong>{location}</p>
                    <p className='mb-3'><strong>Condition:</strong> {condition}</p>
                    <p className='mb-3'><strong>Used:</strong> {used_time} yrs</p>
                    <div className='flex items-center mb-3'>
                        <span className='mr-4'><strong>Seller:</strong> {seller}</span>
                        <span>{verified_seller && <FaCheck className='text-xl text-white inline bg-primary rounded-full p-1'></FaCheck>}</span>

                    </div>
                    <p className='mb-3'><strong>email:</strong> {email}</p>
                    {user?.email ? <label htmlFor="order-modal"
                        className="btn btn-secondary text-white w-full"
                        onClick={() => setSingleProduct(product)}
                    >Buy Now</label> : <button className='w-full'><Link className='btn btn-secondary text-white w-full' to='/login'>Buy Now</Link></button>}

                </div>
                {
                    singleProduct && <OrderModal
                        key={singleProduct._id}
                        singleProduct={singleProduct}
                        setSingleProduct={setSingleProduct}
                    >
                    </OrderModal>
                }
            </div>
        </div>
    );
};

export default SingleCar;