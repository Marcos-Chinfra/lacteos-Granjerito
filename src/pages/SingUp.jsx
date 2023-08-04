import React, { useState} from 'react';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';

const API = "https://powerful-scrubland-84047-e2a369138362.herokuapp.com/api/v1"

const SingUp = () => {
    const [step, setStep] = useState(1);
    const [postId, setPostId] = useState(null);

    const handleNextStep = (data) => {
        const validation = Object.values(data).some( item => item === '');
        console.log(validation)
        if(!validation){
            setStep(2)
        }
    };

    const handlePrevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };


    return (
        <div className='w-screen lg:h-full h-4/5 flex pt-16 flex-col p-5 lg:p-10 bg-Magnolia justify-start lg:justify-center items-center relative'>
            {step === 1 && <Step1 handleNextStep={handleNextStep} API={API} setPostId={setPostId}/>}
            {step === 2 && <Step2 handlePrevStep={handlePrevStep} API={API} postId={postId}/>}
        </div>
    );
}

export default SingUp;