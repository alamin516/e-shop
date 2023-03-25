import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    useTitle('my orders')


    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(` http://localhost:5000/orders?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        }
    })

   

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-5'>
            <h2 className='text-3xl mb-5'>All Orders : {orders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>idx</th>
                            <th>Img</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, i) => <tr className='shadow-md' key={order._id}>
                                <td>{i + 1}</td>
                                <td><img className='w-24 h-24' src={order?.product_img} alt="" /></td>
                                <td>{order?.title}</td>
                                <td>$ {order?.price}</td>
                                <td>
                                    {
                                        order.price && !order.paid && <Link to={`/dashboard/payment/${order._id}`}>
                                        <button className='btn bg-red-600 border-none btn-sm'>Pay Now</button></Link>
                                    }
                                    {
                                        order.price && order.paid && <span className='text-green-500'>Paid</span>
                                    }
                                    
                                
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;