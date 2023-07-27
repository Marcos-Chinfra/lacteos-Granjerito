import React, {useState ,useRef} from 'react';
import { Link } from 'react-router-dom';

const Step1 = ({ handleNextStep }) => {

    const [errorName, setErrorName] = useState(false);
    const [errorRoute, setErrorRoute] = useState(false);
    const [errorObservations, setErrorObservations] = useState(false);
    const form = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form.current);
        const vendedor = {
            'name': formData.get('name'),
            'route': formData.get('route'),
            'observations': formData.get('observations')
        }
        handleNextStep(vendedor);
        if(vendedor.name === ''){
            setErrorName(true)
        }
        else
        {
            setErrorName(false)
        }

        if(vendedor.route === ''){
            setErrorRoute(true)
        }
        else 
        {
            setErrorRoute(false)
        }

        if(vendedor.observations === ''){
            setErrorObservations(true)
        }
        else 
        {
            setErrorObservations(false)
        }
    }

    return (
        <>
        <form className='w-4/5 max-w-lg max-h-form bg-white flex flex-col p-5 shadow' ref={form} onSubmit={handleSubmit}>
            <label className='py-2 text-lg mt-4 text-created' htmlFor='name'>Nombre</label>
            <input className={`border rounded px-2 py-3 font-medium text-sm outline-orange-300 ${errorName ? 'border-red-500' : ''} `} id='name' type="text" name="name" placeholder='e.g Ruben Blades' />

            <label className='py-2 text-lg mt-4 text-created' htmlFor='route'>Ruta</label>
            <input className={`border rounded px-2 py-3 font-medium text-sm outline-orange-300 ${errorRoute ? 'border-red-500' : ''} `} id='route' type="text" name="route" placeholder='e.g Coban' />

            <label className='py-2 text-lg mt-4 text-created' htmlFor='observations'>Observaciones</label>
            <input className={`border rounded px-2 py-3 font-medium text-sm outline-orange-300 ${errorObservations ? 'border-red-500' : ''} `}  id='observations' type="text" name="observations" placeholder='e.g' />

            <button type='submit' className='rounded bg-orange-button text-white border p-4 mt-6 hover:bg-orange-50 hover:border-created hover:text-text-color'>Continuar</button>
        </form>
        <Link to="/sales" className='bottom-4 left-5 lg:bottom-10 lg:left-16 absolute bg-side py-2 px-4 rounded text-button'>
            Cancelar
        </Link>
        </>
        
        
    );
}

export default Step1;