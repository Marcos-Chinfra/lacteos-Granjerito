import React, { useState } from 'react';
import UnSoldProducts from '../components//UnSoldProducts';
import SoldProducts from '../components//SoldProducts';
import ReturnedProducts from '../components/ReturnedProducts';

const UpdateSale = () => {
    const [step, setStep] = useState(1);

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep((prevStep)=> prevStep + 1);
        console.log(step)
    };

    const handlePrevStep = (e) => {
        e.preventDefault();
        setStep((prevStep)=> prevStep - 1);
        console.log(step)
    };


    return (
        <div className='w-screen lg:h-full h-4/5 flex flex-col p-5 lg:p-10 bg-Magnolia lg:justify-center items-center relative'>
            {step === 1 && <UnSoldProducts handleNextStep={handleNextStep} />}
            {step === 2 && <ReturnedProducts handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}/>}
            {step === 3 && <SoldProducts handleNextStep={handleNextStep} />}
        </div>
    );
}

export default UpdateSale;