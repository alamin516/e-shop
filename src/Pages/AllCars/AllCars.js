import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Loading from '../Shared/Loading/Loading';
import Car from './Car';

const AllCars = () => {
    const category = useLoaderData();
    const [product, setProduct] = useState(null)
    const { _id } = category;
    useTitle('all cars')

    const { data: cars = [], isLoading, refetch } = useQuery({
        queryKey: ['cars'],
        queryFn: async () => {
            const res = await fetch(`https://e-shop-self-sigma.vercel.app/products/id?id=${_id}`);
            const data = await res.json();
            return data
        }
    })

    if (isLoading) {
        refetch()
        return <Loading></Loading>
    }
    

    return (
        <div className='container p-6'>
            <h1 className='text-3xl text-center'>{category.category}</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-20'>
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
        </div>
    );
};

export default AllCars;