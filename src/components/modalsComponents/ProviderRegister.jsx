import React, {useState, useRef, useEffect, useContext} from 'react';
import AppContext from '../../context/AppContext';
import Modal from 'react-modal';
import axios from 'axios';

const ProviderRegister = ({ isOpen, onClose }) => {
    const { 
        API, 
        getToken,
        successAlert, 
        errorAlert  
    } = useContext(AppContext);
    const [post, setPost] = useState(null);
    const [errorProvider, setErrorProvider] = useState(false);
    const [errorWorkingDay, setErrorWorkingDay] = useState(false);
    const [errorQuantity, setErrorQuantity] = useState(false);
    const [inputData, setInputData] = useState({
        provider: '',
        workingDay: '',
        quantity: ''
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
                successAlert('Todo en orden', 'Registro guardado con éxito.')
                onClose()
            }else if(post.status !== 201){
                errorAlert('No se puedo crear el producto')  
            }
        }
    },[post])

    const createdRecord = (provider, workingDay, quantity )=> {
        axios.post(`${API}/providers`, {
            provider: provider,
            workingDay: workingDay,
            quantity: quantity,
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
            'provider': formData.get('provider'),
            'workingDay': formData.get('workingDay'),
            'quantity':Number(formData.get('quantity')) ,
        }
        if(record.provider === ''){
            setErrorProvider(true)
        }
        else if(record.workingDay === '')
        {
            setErrorWorkingDay(true)
        }
        else if(record.quantity === 0)
        {
            setErrorQuantity(true)
        }
        else 
        {
            setErrorProvider(false)
            setErrorWorkingDay(false)
            setErrorQuantity(false)
            setInputData({
                provider: '',
                workingDay: '',
                quantity: ''
            })
            console.log(record)
            //createdRecord(record.provider, record.workingDay, record.quantity )
        }
        console.log(record)
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
                    htmlFor="provider"
                    className={`relative block overflow-hidden rounded-md border bg-white px-3 pt-3 shadow focus-within:border-created ${errorProvider ? "border-Error" : "border-gray-200"  }`}
                >
                    <input
                        type="text"
                        id="provider"
                        name='provider'
                        value={inputData.provider}
                        onChange={handleInput}
                        placeholder='proveedor'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Proveedor
                    </span>
                </label>

                <label
                    htmlFor="workingDay"
                    className={`relative block overflow-hidden rounded-md border px-3 bg-white pt-3 shadow focus-within:border-created ${errorWorkingDay ? "border-Error" : "border-gray-200"  } `}
                >
                    <input
                        type="text"
                        id="workingDay"
                        value={inputData.workingDay}
                        onChange={handleInput}
                        name='workingDay'
                        placeholder='Jornada'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Jornada
                    </span>
                </label>

                <label
                    htmlFor="quantity"
                    className={`relative block overflow-hidden rounded-md border px-3 bg-white pt-3 shadow focus-within:border-created ${errorQuantity ? "border-Error" : "border-gray-200"  }`}
                >
                    <input
                        type="number"
                        id="quantity"
                        value={inputData.quantity}
                        onChange={handleInput}
                        name='quantity'
                        placeholder='Cantidad'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Cantidad
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

export default ProviderRegister;