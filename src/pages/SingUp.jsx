import React, {useState} from 'react';

import Step1 from '../components/Step1';
import Step2 from '../components/Step2';

const SingUp = () => {
    const [step, setStep] = useState(1);

    const handleNextStep = (data) => {
        const validation = Object.values(data).some( item => item === '');
        console.log(validation)
        if(!validation){
            setStep(2)
        }
    };
    
    // const handlePrevStep = () => {
    //     setStep((prevStep) => prevStep - 1);
    // };


    return (
        <div className='w-screen lg:h-full h-4/5 flex flex-col p-10 bg-Magnolia justify-center items-center relative'>
            {step === 1 && <Step1 handleNextStep={handleNextStep}/>}
            {step === 2 && <Step2/>}
        </div>
    );
}

export default SingUp;