import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, handleSubmit, } = useForm();
    const { signIn, signInWithGoogle, forgetPassword } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()
    const [createUserEmail, setCreateUserEmail] = useState('')
    const [token] = useToken(createUserEmail)
    const [loginError, setLoginError] = useState('')
    useTitle('Login')

    
    let from = location.state?.from?.pathname || "/";
    
    if(token){
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        setLoginError('')
        signIn(data.email, data.password)
        .then(result => {
            const user = result.user;
            setCreateUserEmail(user?.email)
            toast.success('Successfully Login')
        })
        .catch(error => {
            setLoginError(error.message)
        })
    }


    const handleSignInWithGoogle = () =>{
        signInWithGoogle()
        .then((result)=>{
            const user = result.user;
            console.log(user);
            navigate(from, { replace: true });
        })
        .catch(error => console.error(error))
    }

    const handlePassword = () =>{
        const email = prompt('Enter your email');
        forgetPassword(email)
        .then(()=>{})
        .catch(error => console.error(error))
    }



    return (
        <div className='min-h-screen flex justify-center items-center p-6'>
            <div className='lg:w-4/12 p-6 shadow-lg rounded-xl'>
                <h2 className='text-center text-xl'>Login</h2>
                <form className='mt-8' onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: 'Email Address is required'

                        })} placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password")} placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <Link onClick={handlePassword} className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                            { loginError && <p className='text-red-500'>{loginError}</p>}
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-secondary">Login</button>
                    </div>
                </form>
                <div className='text-center'>
                    <p className='my-6'>New to Seller/buyer? <Link className='text-primary' to='/signup'>Create new account</Link></p>
                    <div className="text-xl font-bold">OR</div>
                </div>
                <div className="form-control mt-6">
                    <button onClick={handleSignInWithGoogle} className="btn bordered-secondary text-black hover:bg-secondary hover:text-white bg-white">CONTINUE WITH GOOGLE</button>
                </div>
                <div className="form-control mt-6 text-center">
                   <p>Admin email: admin@admin.com</p>
                   <p>Admin Possword: 123456</p>
                </div>

            </div>
        </div >
    );
};

export default Login;