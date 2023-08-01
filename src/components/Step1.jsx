import React, {useState ,useRef, useEffect, useContext} from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

const Step1 = ({ handleNextStep, API, setPostId }) => {
    const { errorAlert } = useContext(AppContext);
    const [errorName, setErrorName] = useState(false);
    const [errorRoute, setErrorRoute] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [post, setPost] = useState(null);
    const [getStaff, setGetStaff] = useState(null);
    const [getRouter, setGetRouter] = useState(null);
    const form = useRef(null);

    useEffect(() => {
        axios.get(`${API}/staff`)
            .then((response) => {setGetStaff(response.data)});

        axios.get(`${API}/routes`)
            .then((response) => {setGetRouter(response.data)});
    }, []);



    const searchSeller = (name, lastName, arr) => {
            let user =  arr.find(seller => (seller.name == name && seller.lastName == lastName));
            return user.id
    }

    const searchRoute = (name, arr) => {
        let router =  arr.find(seller => seller.name == name );
        return router.id

    }

    const createSales = (name, router, lastName) => {
        let staff = searchSeller(name, lastName, getStaff);
        let root =  searchRoute(router, getRouter);

        axios.post(`${API}/sales`, {
                staffId: staff,
                routeId: root,
                total: 0
            })
            .then((response) => {
                setPost(response);
                setPostId(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    // Si la respuesta del servidor contiene datos, puedes acceder a ellos con error.response.data.
                    console.log("Error response data:", error.response.data);
                    errorAlert('El producto no se puedo guardar');
                } else if (error.request) {
                    // Si la solicitud se hizo pero no se recibió respuesta (por ejemplo, error de red), puedes acceder a ello con error.request.
                    console.log("Error request:", error.request);
                    errorAlert('El producto no se puedo guardar');
                } else {
                    // Si ocurrió un error durante la configuración de la solicitud, puedes acceder a él con error.message.
                    console.log("Error message:", error.message);
                    errorAlert('El producto no se puedo guardar');
                }
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
        createSales(vendedor.Name, vendedor.Route, vendedor.LastName);
        console.log(post);
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