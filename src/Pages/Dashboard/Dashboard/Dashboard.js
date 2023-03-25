import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useBuyer from '../../../hooks/useBuyer';
import useSeller from '../../../hooks/useSeller';
import useTitle from '../../../hooks/useTitle';


const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    const [isBuyer] = useBuyer(user?.email)
    useTitle('dashboard')


    return (
        <div className='p-5 justify-center min-h-screen'>
            <div>
                <h2 className='text-5xl font-bold'>
                    {isAdmin && "Admin Dashboard"}
                    {isSeller &&  "Seller Dashboard"}
                    {isBuyer &&  "Buyer Dashboard"}
                </h2>
            </div>
        </div>
    );
};

export default Dashboard;