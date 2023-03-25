import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const MyProducts = () => {
    const {user} = useContext(AuthContext);
    useTitle('My products')

    const {data: products = [], refetch, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () =>{
            const res = await fetch(`https://e-shop-self-sigma.vercel.app/products/my-products?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        }
    })


   
    

    const handleProductDelete = product =>{
        fetch(`https://e-shop-self-sigma.vercel.app/products/${product._id}` ,{
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success(`${product?.name} deleted successfully`)
                refetch()
            }
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className='p-5'>
            <h2 className='text-3xl mb-5'>My Products : {products.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>idx</th>
                            <th>Name</th>
                            <th>img</th>
                            <th>price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, i )=> <tr key={product._id}>
                            <th>{i + 1}</th>
                            <td>{product?.name}</td>
                            <td><img className='w-24 h-24' src={product?.img} alt="" /></td>
                            <td>${product?.price}</td>
                            <td><button onClick={()=> handleProductDelete(product)} className='btn btn-sm bg-red-600 border-red-600 text-white'>Delete</button></td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;