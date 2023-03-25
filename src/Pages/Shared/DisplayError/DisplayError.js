import { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const DisplayError = () => {
    const error = useRouteError()
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate('/login')
            })
            .catch(error => console.error(error))
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div>
                <h2 className='text-red-600 text-3xl'>Sorry, you have not access this Route</h2>
                <p className='text-red-600 text-xl'>{error.statusText || error.message}</p>
                <h2>Please <button className='btn btn-primary btn-sm mt-3' onClick={handleSignOut}>Sign Out</button> for log back again.</h2>
            </div>
        </div>
    );
};

export default DisplayError;