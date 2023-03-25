import React from 'react';
import useTitle from '../../../hooks/useTitle';
import Banner from '../Banner/Banner';
import GetInTouch from '../GetInTouch/GetInTouch';
import HomeAbout from '../HomeAbout/HomeAbout';
import HomeCategory from '../HomeCategory/HomeCategories';
import HomeProducts from '../HomeProducts/HomeProducts';

const Home = () => {
    useTitle('Home')
    return (
        <div>
            <Banner></Banner>
            <HomeCategory></HomeCategory>
            <HomeAbout></HomeAbout>
            <HomeProducts></HomeProducts>
            <GetInTouch></GetInTouch>
        </div>
    );
};

export default Home;