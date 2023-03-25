import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import useVerified from '../../../hooks/useVerified';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [verifiedSeller] = useVerified(user?.email)
    const imgHostingApiKey = process.env.REACT_APP_imgbb_api_key;
    useTitle('add product')

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`https://e-shop-self-sigma.vercel.app/categories`);
            const data = await res.json();
            return data
        }
    })

    const { data: locations = [], refetch} = useQuery({
        queryKey: ['locations'],
        queryFn: async () => {
            const res = await fetch(`https://e-shop-self-sigma.vercel.app/locations`);
            const data = await res.json();
            return data
        }
    })




    const handleAddProduct = data => {
        const image = data.product_img[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imgHostingApiKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);

                    const product = {
                        seller: data.seller,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        categoryId: data.categoryId,
                        img: imgData.data.url,
                        price: data.price,
                        resale_price: data.resale_price,
                        description: data.description,
                        condition: data.condition,
                        verified_seller : verifiedSeller.verified

                    }

                    fetch(`https://e-shop-self-sigma.vercel.app/products`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success(`Product added successfully`);
                                navigate('/dashboard/myproducts')
                                refetch()
                            }
                        })
                }
            })

    }

    return (
        <div className='lg:w-1/2 p-6'>
            <h2 className='text-3xl mb-5'>Add A Product</h2>
            <form className='mt-8 mx-auto' onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" readOnly defaultValue={user?.displayName} {...register("seller")} placeholder="name" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input readOnly defaultValue={verifiedSeller?.phone} type="tel" {...register("phone")} placeholder="Phone" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" readOnly defaultValue={user?.email} {...register("email")} placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" {...register("name")} placeholder="Title" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Regular Price</span>
                    </label>
                    <input type="text" {...register("price")} placeholder="Regular Price" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Resale Price</span>
                    </label>
                    <input type="text" {...register("resale_price")} placeholder="Resale Price" className="input input-bordered" />
                </div>
                {/* <div className="form-control">
                    <label className="label">
                        <span className="label-text">Used Time</span>
                    </label>
                    <input type="text" {...register("used_time")} placeholder="Used time" className="input input-bordered" />
                </div> */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Condition type</span>
                    </label>
                    <select {...register("condition")} className="select select-bordered w-full ">
                        <option disabled selected>Select type</option>
                        <option value="excellent">excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>

                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Locations</span>
                    </label>
                    <select {...register("location")} className="select select-bordered w-full ">
                        <option disabled selected>Selected Location</option>
                        {
                            locations.map(location => <option
                                key={location._id}
                                value={location.location}
                            >{location.location}</option>)
                        }
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select {...register("categoryId", {
                        required: `please`
                    })} className="select select-bordered w-full ">
                        <option disabled selected>Selected Category</option>
                        {
                            categories.map(category => <option
                                key={category._id}
                                value={category._id}
                            >{category.category}</option>)
                        }

                    </select>
                </div>
                <div className="form-control">
                    <label className="label">Description</label>
                    <textarea cols="30" rows="20" type="textarea" {...register("description")} placeholder="Description" className="input input-bordered"></textarea>
                </div>
                <div className="form-control">
                    <label className="label"></label>
                    <input type="file" {...register("product_img")} placeholder="Photo Upload" className="input input-bordered" />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-secondary text-white border-none">Add A Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
