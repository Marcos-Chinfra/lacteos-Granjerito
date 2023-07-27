import React, {useState ,useRef, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Step1 = ({ handleNextStep, API }) => {

    const [errorName, setErrorName] = useState(false);
    const [errorRoute, setErrorRoute] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [post, setPost] = useState(null);
    const [get, setGet] = useState(null)
    const form = useRef(null);

    useEffect(() => {
        axios.get(`${API}/staff`)
            .then((response) => {setGet(response.data)});
    }, [])


    const searchSeller = (name, lastName, arr) => {
        let user =  arr.find(seller => (seller.name == name && seller.lastName == lastName));
        console.log(user.id)
    }

    const createSales = (name, router, observations) => {
        axios
            .post(API, {
                "staffId": name,
                "routedId": router,
                "observations": observations,
                "total": 0
            })
            .then((response) => {
                setPost(response.data);
            })
            .catch((err) => {
                console.error(err.message)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form.current);
        const vendedor = {
            'Name': formData.get('mame'),
            'Route': formData.get('route'),
            'LastName': formData.get('lastName')
        }

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

        if(vendedor.LastName === ''){
            setErrorLastName(true)
        }
        else 
        {
            setErrorLastName(false)
        }
        searchSeller(vendedor.Name, vendedor.LastName, get)
    }

    return (
        <>
        <form className='w-4/5 max-w-lg max-h-form bg-white flex flex-col p-5 shadow' ref={form} onSubmit={handleSubmit}>

            <label
                htmlFor="mame"
                className={`relative block rounded-md border  shadow-sm mt-4 focus-within:border-created focus-within:ring-1 focus-within:ring-created ${errorName ? 'border-Error' : 'border-gray-200'}`}
            >
                <input
                    type="text"
                    id="mame"
                    className="peer border-none bg-transparent placeholder-transparent p-4 focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="mame"
                    name="mame"
                />
                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    Nombre
                </span>
            </label>

            <label
                htmlFor="lastName"
                className={`relative block rounded-md border  shadow-sm mt-4 focus-within:border-created focus-within:ring-1 focus-within:ring-created ${errorLastName ? 'border-Error' : 'border-gray-200'}`}
            >
                <input
                    type="text"
                    id="lastName"
                    className="peer border-none bg-transparent placeholder-transparent p-4 focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="lastName"
                    name="lastName"
                />
                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    Apellido
                </span>
            </label>

            <label
                htmlFor="route"
                className={`relative block rounded-md border shadow-sm mt-4 focus-within:border-created focus-within:ring-1 focus-within:ring-created ${errorRoute ? 'border-Error' : 'border-gray-200 '}`}
            >
                <input
                    type="text"
                    id="route"
                    className="peer border-none bg-transparent placeholder-transparent p-4 focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="route"
                    name="route"
                />
                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    Ruta
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