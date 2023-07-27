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
            'Name': formData.get('Name'),
            'Route': formData.get('Route'),
            'Observations': formData.get('Observations')
        }
        console.log(vendedor)
        handleNextStep(vendedor);
        if(vendedor.Name === ''){
            setErrorName(true)
        }
        else
        {
            setErrorName(false)
        }

        if(vendedor.Route === ''){
            setErrorRoute(true)
        }
        else 
        {
            setErrorRoute(false)
        }

        if(vendedor.Observations === ''){
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

            <label
                htmlFor="Name"
                className={`relative block rounded-md border border-gray-200 shadow-sm mt-4 focus-within:border-created focus-within:ring-1 focus-within:ring-created ${errorName ? 'border-Error' : ''}`}
            >
                <input
                    type="text"
                    id="Name"
                    className="peer border-none bg-transparent placeholder-transparent p-4 focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="Name"
                    name="Name"
                />
                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    Nombre
                </span>
            </label>

            <label
                htmlFor="Route"
                className={`relative block rounded-md border border-gray-200 shadow-sm mt-4 focus-within:border-created focus-within:ring-1 focus-within:ring-created ${errorRoute ? 'border-Error' : ''}`}
            >
                <input
                    type="text"
                    id="Route"
                    className="peer border-none bg-transparent placeholder-transparent p-4 focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="Route"
                    name="Route"
                />
                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    Ruta
                </span>
            </label>


            <label
                htmlFor="Observations"
                className={`relative block rounded-md border border-gray-200 shadow-sm mt-4 focus-within:border-created focus-within:ring-1 focus-within:ring-created ${errorObservations ? 'border-Error' : ''}`}
            >
                <input
                    type="text"
                    id="Observations"
                    className="peer border-none bg-transparent placeholder-transparent p-4 focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="Observations"
                    name="Observations"
                />
                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    Observaciones
                </span>
            </label>

            <button type='submit' className='rounded bg-orange-button text-white border p-4 mt-6 hover:bg-orange-50 hover:border-created hover:text-text-color'>Continuar</button>
        </form>
        <Link to="/sales" className='bottom-4 left-5 lg:bottom-10 lg:left-16 absolute bg-side py-2 px-4 rounded text-button'>
            Cancelar
        </Link>
        </>
        
        
    );
}

export default Step1;