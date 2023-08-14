import React, {useState, useRef, useEffect, useContext} from 'react';
import AppContext from '../../context/AppContext';
import Modal from 'react-modal';
import axios from 'axios';

const ProductsRegister = ({ isOpen, onClose }) => {
    const { 
        API, 
        getToken,
        successAlert, 
        errorAlert  
    } = useContext(AppContext);
    const [getCategories, setGetCategories] = useState(null);
    const [post, setPost] = useState(null);
    const [errorName, setErrorName] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorType, setErrorType] = useState(false);
    const [errorWeight, setErrorWeight] = useState(false);
    const [errorUnit, setErrorUnit] = useState(false);
    const [inputData, setInputData] = useState({
        product: '',
        price: '',
        description: '',
        type: '',
        weight: '',
        unit_of_measurement: ''
    });

    const apiKey = import.meta.env.VITE_API_KEY
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    useEffect(()=>{
        axios.get(`${API}/categories`,{ headers })
            .then((response) => {setGetCategories(response.data)})
            .catch((error) => {console.error(error)})
    },[]);

    useEffect(()=>{
        if(post){
            if(post.status === 201){
                successAlert('Todo en orden', 'Producto creado con éxito.')
                onClose()
            }else if(post.status !== 201){
                errorAlert('No se puedo crear el producto')  
            }
        }
    },[post])


    const form = useRef(null);

    const createdRecord = (name, price, description, categoryId, type, weight, unit_of_measurement )=> {

        axios.post(`${API}/products`, {
            name: name,
            price: price,
            description: description,
            categoryId: categoryId,
            type: type,
            weight: weight,
            unit_of_measurement: unit_of_measurement
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
            'name': formData.get('product'),
            'price': Number(formData.get('price')),
            'description': formData.get('description'),
            'categoryId': Number(formData.get('category')),
            'type': formData.get('type'),
            'weight': Number(formData.get('weight')),
            'unit_of_measurement': formData.get('unit_of_measurement')
        }
        if(record.name === ''){
            setErrorName(true)
        }
        else if(record.price === 0)
        {
            setErrorPrice(true)
        }
        else if(record.description === '')
        {
            setErrorDescription(true)
        }
        else if(record.type === '')
        {
            setErrorType(true)
        }
        else if(record.weight === 0)
        {
            setErrorWeight(true)
        }
        else if(record.unit_of_measurement === '')
        {
            setErrorUnit(true)
        }
        else 
        {
            setErrorName(false)
            setErrorPrice(false)
            setErrorDescription(false)
            setErrorType(false)
            setErrorWeight(false)
            setErrorUnit(false)
            setInputData({
                product: '',
                price: '',
                description: '',
                categoryId: '',
                type: '',
                weight: '',
                unit_of_measurement: ''
            })
            createdRecord(record.name, record.price, record.description, record.categoryId, record.type, record.weight, record.unit_of_measurement )
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
                action=""
            >
                <h1 className='text-center text-xl text-side'>Ingrese los datos del producto</h1>

                <label
                    htmlFor="product"
                    className={`relative block overflow-hidden rounded-md border bg-white px-3 pt-3 shadow focus-within:border-created ${errorName ? "border-Error" : "border-gray-200"  }`}
                >
                    <input
                        type="text"
                        id="product"
                        name='product'
                        value={inputData.product}
                        onChange={handleInput}
                        placeholder='Producto'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Producto
                    </span>
                </label>

                <label
                    htmlFor="price"
                    className={`relative block overflow-hidden rounded-md border px-3 bg-white pt-3 shadow focus-within:border-created ${errorPrice ? "border-Error" : "border-gray-200"  } `}
                >
                    <input
                        type="number"
                        id="price"
                        value={inputData.price}
                        onChange={handleInput}
                        name='price'
                        placeholder='Precio'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Precio
                    </span>
                </label>

                <label
                    htmlFor="description"
                    className={`relative block overflow-hidden rounded-md border px-3 bg-white pt-3 shadow focus-within:border-created ${errorDescription ? "border-Error" : "border-gray-200"  }`}
                >
                    <input
                        type="text"
                        id="description"
                        value={inputData.description}
                        onChange={handleInput}
                        name='description'
                        placeholder='description'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Descripción
                    </span>
                </label>

                <label 
                    htmlFor="category" 
                    className="block text-sm font-medium text-gray-900"
                >
                    Categorías

                <select
                    name="category"
                    id="category"
                    className="w-full rounded-lg shadow border-gray-300 text-gray-700 sm:text-sm py-3 px-1 mt-1.5 outline-created focus:border-created"
                >
                    {getCategories &&
                        getCategories.map((item)=>(
                            <option className='p-2' key={item.id} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
                </label>

                <label
                    htmlFor="type"
                    className={`relative block overflow-hidden rounded-md border px-3 bg-white pt-3 shadow focus-within:border-created ${errorType ? "border-Error" : "border-gray-200" }`}
                >
                    <input
                        type="text"
                        id="type"
                        value={inputData.type}
                        onChange={handleInput}
                        name='type'
                        autoComplete ='on'
                        placeholder='Tipo'
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                        Tipo
                    </span>
                </label>

                <section className='flex'>
                    <label
                        htmlFor="weight"
                        className={`relative block w-2/5 mr-2 overflow-hidden rounded-md border  px-2 bg-white pt-3 shadow focus-within:border-created ${errorWeight ? "border-Error" : "border-gray-200" }`}
                    >
                        <input
                            type="number"
                            id="weight"
                            value={inputData.weight}
                            onChange={handleInput}
                            name='weight'
                            placeholder='Peso'
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                            >
                            Peso
                        </span>
                    </label>

                    <label
                    htmlFor="unit_of_measurement"
                    className={`relative block w-full overflow-hidden rounded-md border  px-2 bg-white pt-3 shadow focus-within:border-created ${errorUnit ? "border-Error" : "border-gray-200" }`}
                    >
                        <input
                            type="text"
                            id="unit_of_measurement"
                            value={inputData.unit_of_measurement}
                            onChange={handleInput}
                            name='unit_of_measurement'
                            autoComplete ='on'
                            placeholder='Unidad'
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                            >
                            Unidad
                        </span>
                    </label>                    
                </section>

                <label
                    htmlFor="img"
                    className={`flex flex-col w-4/5 mx-auto bg-gray-50 p-1 border border-gray-200 items-center text-sm`}
                >
                    Imagen
                    <input
                        type="file"
                        id="img"
                        name='img'
                        placeholder='imagen'
                        className=""
                    />

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

export default ProductsRegister;