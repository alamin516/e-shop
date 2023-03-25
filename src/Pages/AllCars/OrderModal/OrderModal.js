import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const OrderModal = ({ singleProduct, setSingleProduct}) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { price, resale_price, name , email, img} = singleProduct;
    const navigate = useNavigate();
    const [locationError, setLocationError] = useState('')

    const { data: locations = [], refetch } = useQuery({
        queryKey: ['locations'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/locations`);
            const data = await res.json();
            return data
        }
    })


    const handleOrder = data => {
        setLocationError('')
       
        if(data.location === 'Select your location'){
            setLocationError('Location is required')
        }else{
            const order = {
                title: name,
                product_img: img,
                price: data.price,
                buyer: data.name,
                email: data.email,
                phone: data.phone,
                location: data.location,
                seller_email : email,
            }
    
            fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        setSingleProduct('')
                        toast.success(`Order Successfully Done`)
                        refetch()
                        navigate('/dashboard/myorders')
    
                    }
                    else {
                        setSingleProduct('')
                        toast.error(data.message)
                    }
    
                })
        }



    }
    return (
        <>
            <input name="" type="checkbox" id="order-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="order-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form className='mt-8' onSubmit={handleSubmit(handleOrder)}>
                        <div className="form-control">
                            <input readOnly defaultValue={user?.displayName} type="text" {...register("name", {
                                required: 'Name is required'

                            })} placeholder="name" className="input input-bordered" />
                            {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input readOnly defaultValue={user?.email} type="email" {...register("email", {
                                required: 'Email Address is required'

                            })} placeholder="email" className="input input-bordered" />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="tel" {...register("phone", {
                                required: 'Phone Address is required'

                            })} placeholder="Phone Number" className="input input-bordered" />
                            {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <select {...register("location", {
                                required: "alllla"
                            })} className="input input-bordered">
                                <option defaultValue='Select your location'>Select your location</option>
                                {
                                    locations.map(location =>
                                        <option
                                            value={location.location}
                                            key={location._id}>
                                            {location.location}
                                        </option>)
                                }

                            </select>
                            {locationError && <p className='text-red-600'>{locationError}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            {resale_price !== '' ? <input readOnly defaultValue={resale_price} type="text" {...register("price")} className="input input-bordered" /> :
                                <input readOnly defaultValue={price} type="text" {...register("price")} className="input input-bordered" />
                            }
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit"
                            className="btn btn-secondary">Order</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default OrderModal;