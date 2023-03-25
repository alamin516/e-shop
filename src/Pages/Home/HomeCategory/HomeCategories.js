import React, { useEffect, useState } from 'react';
import HomeCategory from './HomeCategory';

const HomeCategories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])


    return (
        <div className='bg-[#F8F7F7]'>
            <div className='container lg:py-20 py-10'>
                <h2 className='text-4xl text-center font-bold'>Product Categories</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10'>
                    {
                        categories.map(category => <HomeCategory
                            key={category._id}
                            category={category}
                        ></HomeCategory>)
                    }
                </div>
            </div>
        </div>
    );
};

export default HomeCategories;