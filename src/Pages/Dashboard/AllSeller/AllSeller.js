import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const AllSeller = () => {
    useTitle('all seller')
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://e-shop-self-sigma.vercel.app/users/seller?role=seller', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        }
    })



    const handleUpdateSellerStatus = id => {
        fetch(`https://e-shop-self-sigma.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('This seller is now verified')
                    refetch()
                }
            })
    }

    const handleSellerDelete = seller => {
        fetch(`https://e-shop-self-sigma.vercel.app/users/seller/${seller?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`${seller?.name} deleted successfully`)
                    refetch()
                }
            })
    }

    if (isLoading) {
        refetch()
        return <Loading></Loading>
    }


    return (
        <div className='p-5'>
            <h2 className='text-3xl mb-5'>All Sellers : {sellers.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers?.map((seller, i) => <tr refetch key={seller._id}>
                                <th>{i + 1}</th>
                                <td>{seller?.name}</td>
                                <td>{seller?.email}</td>
                                {
                                    seller?.verified !== 'verified' ? <td><button onClick={() => handleUpdateSellerStatus(seller._id)} className='btn btn-sm btn-primary text-white'>Make verified</button></td>
                                        :
                                        <td><span className='bg-primary rounded-md p-2 text-white'>{seller?.verified}</span>
                                        </td>
                                }

                                <td><button onClick={() => handleSellerDelete(seller)} className='btn btn-sm bg-red-600 border-red-600 text-white'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;