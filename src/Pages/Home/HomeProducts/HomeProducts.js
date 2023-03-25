import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Car from '../../AllCars/Car';
import OrderModal from '../../AllCars/OrderModal/OrderModal';
import Loading from '../../Shared/Loading/Loading';

const HomeProducts = () => {
    const [product, setProduct] = useState(null)

    const { data: cars = [], isLoading, refetch } = useQuery({
        queryKey: ['cars'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products`);
            const data = await res.json();
            return data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    refetch()
    return (
        <div className='bg-[#F8F7F7]'>
            <div className='container lg:py-20 py-10'>
                <h1 className='text-4xl text-center font-bold'>Featured Listings</h1>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-20 p-4'>
                    {
                        cars.map(car =>
                            <Car
                                key={car._id}
                                car={car}
                                setProduct={setProduct}
                            >
                            </Car>

                        )
                    }
                </div>
                {
                    product && <OrderModal
                        key={product._id}
                        product={product}
                        setProduct={setProduct}
                        refetch={refetch}
                    >
                    </OrderModal>
                }
            </div>
        </div>
    );
};

export default HomeProducts;