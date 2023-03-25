import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const MyBuyers = () => {
    const {user} = useContext(AuthContext)


    const {data : buyers = [], refetch, isLoading} = useQuery({
        queryKey: ["buyers"],
        queryFn: async ()=>{
            const res = await fetch(`http://localhost:5000/orders/mybuyer?email=${user?.email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            } );
            const data = await res.json();
            return data;
        }
    })


    return (
        <div className='p-5'>
        <h2 className='text-3xl mb-5'>All Buyers : {buyers.length}</h2>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>idx</th>
                        <th>Buyer</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        buyers.map((buyer, i) => <tr className='shadow-md' key={buyer._id}>
                            <td>{i + 1}</td>
                            <td>{buyer?.buyer}</td>
                            <td>{buyer?.phone}</td>
                            
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyBuyers;