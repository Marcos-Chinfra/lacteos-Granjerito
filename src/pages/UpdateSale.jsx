import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import UnSoldProducts from '../components//UnSoldProducts';
import SoldProducts from '../containers/SoldProducts';
import ReturnedProducts from '../components/ReturnedProducts';


const API = "https://powerful-scrubland-84047-e2a369138362.herokuapp.com/api/v1"

const UpdateSale = () => {
    const { sendId } = useContext(AppContext);
    const [step, setStep] = useState(1);


    const handleNextStep = (e) => {
        e.preventDefault();
        setStep((prevStep)=> prevStep + 1);
    };

    const handlePrevStep = (e) => {
        e.preventDefault();
        setStep((prevStep)=> prevStep - 1);
    };
    console.log(sendId)
    return (
        <div className={`w-screen lg:h-full h-4/5 flex flex-col p-5 lg:p-10 bg-Magnolia lg:justify-center items-center relative overflow-y-auto view-form-update `}>
            {step === 1 && <UnSoldProducts handleNextStep ={handleNextStep} API={API} Id={sendId}/>}
            {step === 2 && <ReturnedProducts handlePrevStep ={handlePrevStep} handleNextStep = {handleNextStep} API={API} Id={sendId} />}
            {step === 3 && <SoldProducts handlePrevStep={handlePrevStep} API={API} Id={sendId}  />}
        </div>
    );
}

export default UpdateSale;