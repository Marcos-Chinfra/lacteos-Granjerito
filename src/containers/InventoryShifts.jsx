import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import Manufactured from '../components/Manufactured';
import PieChart from '../components/PieChart';

const InventoryShifts = () => {
    const {SyncLoader, API, searchProduct, successAlert, errorAlert} = useContext(AppContext);
    const [post, setPost] = useState(null);
    const [getProduct, setGetProduct] = useState(null);
    const [errorProduct, setErrorProduct] = useState(false);
    const [errorQuantity, setErrorQuantity] = useState(false);
    const [getShifts, setGetShifts] = useState(null);
    const [inputData, setInputData] = useState({
        product: '',
        quantity: ''
    });
    const form = useRef(null);

    useEffect(() => {
        axios.get(`${API}/shift-output`)
            .then((response) => {
                setGetShifts(response.data);
            })
            .catch((err)=>{console.error(err)})

        axios.get(`${API}/products`)
            .then((response) => {setGetProduct(response.data)});
    },[post]);

    useEffect(() => {
        if(post){
            if(post.status === 201){
                successAlert('Todo bien!!', 'El registro se a guardado con éxito.')
            }else if(post.status !== 201){
                errorAlert('No se ha registrado en el inventario.');
            }
        }
    }, [post]);

    const override =  {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        margin: "20px 0",
        height: "60px"
    };


    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputData({
        ...inputData,
        [name]: value,
        });
    }

    const createdRecord = (producto, cantidad )=> {
        let item = searchProduct(producto, getProduct)

        axios.post(`${API}/shift-output`, {
            productId: item,
            amount: cantidad,
        })
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(form.current);
        const record = {
            'product': formData.get('product'),
            'amount': formData.get('quantity'),
        }
        if(record.product === ''){
            setErrorProduct(true)
        }
        else if(record.amount === '')
        {
            setErrorQuantity(true)
        }
        else 
        {
            setErrorProduct(false)
            setErrorQuantity(false)
            setInputData({
                product: '',
                quantity: '',
            })
            createdRecord(record.product, record.amount )
        }
    }

    return (
        <main className='w-full flex flex-col md:flex-row mt-4'>
            <section className='w-full md:w-1/2 md:px-4 overflow-x-auto overflow-y-auto '>
                { getShifts 
                    ?   
                        <div className='text-center max-w-tables mx-auto relative'>
                            <h1 className='mb-2'>
                                Producción
                            </h1>
                            <a href="#formulario" className='absolute top-0 right-0 text-xs py-1 px-2 bg-created rounded text-white md:hidden'> Registrar</a>
                            <Manufactured getShifts={getShifts} /> 
                        </div>
                    :
                        <SyncLoader color='#11aaff'  cssOverride={override} />
                }
            </section>
            <article className='w-full md:w-1/2 md:px-3 mt-5 md:mt-0 overflow-y-auto'>
                <PieChart />
                <form 
                    id='formulario' 
                    ref={form}
                    onSubmit={handleSubmit} 
                    className='w-full mx-auto max-w-formInventory bg-Magnolia shadow rounded-sm py-3 px-5 mt-6'  >
                    <label htmlFor="Product" className="sr-only mt-2"> Producto </label>
                    <input
                        type="text"
                        name='product'
                        id="Product"
                        value={inputData.product}
                        onChange={handleInput}
                        placeholder="Producto"
                        className={`w-full p-2 lg:p-3 rounded-md  border shadow-sm text-sm sm:text-md outline-none ${errorProduct ? 'border-Error' : 'border-gray-200'}`}
                    />

                    <label htmlFor="Quantity" className="sr-only "> Cantidad </label>
                    <input
                        type="number"
                        id="Quantity"
                        name='quantity'
                        placeholder="Cantidad"
                        value={inputData.quantity}
                        onChange={handleInput}
                        className={`w-full mt-2 p-2 lg:p-3 rounded-md  border shadow-sm text-sm sm:text-md outline-none ${errorQuantity ? 'border-Error' : 'border-gray-200'}`}
                    />

                    <button 
                        type='submit'
                        className='w-full mt-2 p-2 rounded bg-gray-50 text-liner-color border border-liner-color hover:bg-gray-100'
                    >
                        Crear
                    </button>
                </form>
            </article>
        </main>
    );
}

export default InventoryShifts;