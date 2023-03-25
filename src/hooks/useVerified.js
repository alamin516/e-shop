import { useEffect, useState } from 'react';

const useVerified = email => {
    const [verifiedSeller, setVerifiedSeller] = useState({})
    useEffect(() => {
            fetch(`https://e-shop-self-sigma.vercel.app/users/verified/seller?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setVerifiedSeller(data)
                })
    }, [email])

    return [verifiedSeller]
};

export default useVerified;