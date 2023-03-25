import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
    const [createUserEmail, setCreateUserEmail] = useState('')
    const [token] = useToken(createUserEmail)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [optionError, setOptionError] = useState('')
    useTitle('Signup')

    if (token) {
        return navigate('/')
    }

    const handleSignUp = data => {
        setError('')
        setOptionError('')

        if(data.role === 'Select'){
            setOptionError('Required')
        }else{
            createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                const userInfo = {
                    displayName: data.name

                }
                updateUser(userInfo)
                    .then(() => {
                        saveUserDb(data.name, data.email, data.role.toLowerCase(), data.phone)

                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                console.error(error)
                setError(error.message)
             })
        }

        
    }

    const saveUserDb = (name, email, role, phone) => {
        const user = { name, email, role, phone }

        fetch('https://e-shop-self-sigma.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreateUserEmail(email)
                toast.success(`${role} account created successfully`)

            })
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate('/')
            })
            .catch(error => console.error(error))
    }


    return (
        <div className='min-h-screen flex justify-center items-center p-6'>
            <div className='lg:w-4/12 p-6 shadow-lg rounded-xl'>
                <h2 className='text-center text-xl'>Sign Up</h2>
                <form className='mt-8' onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", {
                            required: 'Name is required'

                        })} placeholder="name" className="input input-bordered" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: 'Email Address is required'

                        })} placeholder="email" className="input input-bordered" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="tel" {...register("phone", {
                            required: 'Phone Number is required'

                        })} placeholder="phone" className="input input-bordered" />
                        {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Seller/Buyer</span>
                        </label>
                        <select {...register("role", {
                            required: "Required"
                        })} className="select w-full input-bordered">
                            <option defaultValue="Select">Select</option>
                            <option value="Seller">Seller</option>
                            <option value="Buyer">Buyer</option>
                        </select>
                        {optionError && <p className='text-red-600'>{optionError}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password",
                            {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                },
                            })} placeholder="password" className="input input-bordered" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <label className="label">
                        {error && <span className="label-text text-red-500">{error}</span>}
                    </label>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-secondary">Sign Up</button>
                    </div>
                </form>
                <div className='text-center'>
                    <p className='my-6'>Already have an account? <Link className='text-primary' to='/login'>Please login</Link></p>
                    <div className="text-xl font-bold">OR</div>
                </div>
                <div className="form-control mt-6">
                    <button onClick={handleSignInWithGoogle} className="btn bordered-secondary text-black hover:bg-secondary hover:text-white bg-white">CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div >
    );
};

export default SignUp;