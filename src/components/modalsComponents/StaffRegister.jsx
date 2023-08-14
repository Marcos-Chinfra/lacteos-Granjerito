import React, {useState, useRef, useEffect, useContext} from 'react';
import AppContext from '../../context/AppContext';
import Modal from 'react-modal';
import axios from 'axios';

const StaffRegister = ({ isOpen, onClose }) => {
    const { 
        API, 
        getToken,
        successAlert, 
        errorAlert  
    } = useContext(AppContext);
    const [post, setPost] = useState(null);
    const [errorName, setErrorName] = useState(false);
    const [errorLasName, setErrorLasName] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [inputData, setInputData] = useState({
        name: '',
        lastName: '',
        phone: '',
        role: ''
    });

    const form = useRef(null);
    const apiKey = import.meta.env.VITE_API_KEY
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    useEffect(()=>{
        if(post){
            if(post.status === 201){
                successAlert('Todo en orden', 'Se ha registrado un nuevo empleado.')
                onClose()
            }else if(post.status !== 201){
                errorAlert('No se puedo crear el producto')  
            }
        }
    },[post])

    const createdRecord = (name, lasName, phone, role)=> {
        axios.post(`${API}/staff`, {
            name: name,
            lastName: lasName,
            phone: phone,
            role: role
        }, { headers })
        .then((response)=>{setPost(response)})
        .catch((error) => {
            if (error.response) {
                console.log("Error response data:", error.response.data);
                setPost(error)
            } else if (error.request) {
                console.log("Error request:", error.request);
                setPost(error)
            } else {
                console.log("Error message:", error.message);
                setPost(error)
            }
        })
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputData({
        ...inputData,
        [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(form.current);
        const record = {
            'name': formData.get('name'),
            'lastName': formData.get('lastName'),
            'phone': formData.get('phone'),
            'role': formData.get('role'),
        }
        if(record.name === ''){
            setErrorName(true)
        }
        else if(record.lastName === '')
        {
            setErrorLasName(true)
        }
        else if(record.phone === '')
        {
            setErrorPhone(true)
        }
        else 
        {
            setErrorName(false)
            setErrorLasName(false)
            setErrorPhone(false)
            setInputData({
                name: '',
                lastName: '',
                phone: '',
                role: ''
            })
            record.role === '' 
            ?  
                createdRecord(record.name, record.lastName, record.phone ) 
            : 
                createdRecord(record.name, record.lastName, record.phone, record.role )
        }
    }



    return (
        <Modal 
            className="w-screen h-screen flex justify-center items-center" 
            isOpen={isOpen} 
            onRequestClose={onClose}
        >
            <form 
                ref={form}
                className='w-5/6 max-w-tables flex flex-col gap-4 bg-Magnolia p-4 '
            >
                <h1 className='text-center text-xl text-side'>Ingrese los datos del producto</h1>

                <label
                    htmlFor="name"
                    className={`relative block overflow-hidden rounded-md border bg-white px-3 pt-3 shadow focus-within:border-created ${errorName ? "border-Error" : "border-gray-200"  }`}
                >
                    <input
                        type="text"
                        id="name"
                        name='name'
                        value={inputData.name}
                        onChange={handleInput}
                        placeholder='Nombre'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Nombre
                    </span>
                </label>

                <label
                    htmlFor="lastName"
                    className={`relative block overflow-hidden rounded-md border px-3 bg-white pt-3 shadow focus-within:border-created ${errorLasName ? "border-Error" : "border-gray-200"  } `}
                >
                    <input
                        type="text"
                        id="lastName"
                        value={inputData.lastName}
                        onChange={handleInput}
                        name='lastName'
                        placeholder='Apellido'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Apellido
                    </span>
                </label>

                <label
                    htmlFor="phone"
                    className={`relative block overflow-hidden rounded-md border px-3 bg-white pt-3 shadow focus-within:border-created ${errorPhone ? "border-Error" : "border-gray-200"  }`}
                >
                    <input
                        type="text"
                        id="phone"
                        value={inputData.phone}
                        onChange={handleInput}
                        name='phone'
                        placeholder='Numero de teléfono'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Numero de teléfono
                    </span>
                </label>


                <label
                    htmlFor="role"
                    className={`relative block overflow-hidden rounded-md border px-3 bg-white pt-3 shadow focus-within:border-created `}
                >
                    <input
                        type="text"
                        id="role"
                        value={inputData.role}
                        onChange={handleInput}
                        name='role'
                        placeholder='Rol'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Rol
                    </span>
                </label>

                <section className='flex justify-around'>
                    <button
                        type='submit'
                        className='px-3 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-white hover:border-orange-button hover:text-side'
                        onClick={handleSubmit}
                    >
                        Crear
                    </button>

                    <button
                        className='px-3 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-white hover:border-orange-button hover:text-side'
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </section>
            </form>
        </Modal>
    );
}

export default StaffRegister;