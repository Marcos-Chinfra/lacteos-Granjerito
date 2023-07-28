import React from 'react';
import UnSoldProducts from '../components//UnSoldProducts';
import SoldProducts from '../components//SoldProducts';
import ReturnedProducts from '../components/ReturnedProducts';

const UpdateSale = () => {
    return (
        <div className='w-screen lg:h-full h-4/5 flex flex-col p-10 bg-Magnolia justify-center items-center relative'>
            <UnSoldProducts />
        </div>
    );
}

export default UpdateSale;