import React, {useState, useEffect, useContext, useRef} from 'react';
import AppContext from '../context/AppContext';
import axios from "axios";

const ReturnedProducts = ({ handlePrevStep, handleNextStep, API, Id  }) => {
    
    const { searchProduct, successAlert, errorAlert, getToken } = useContext(AppContext);
    const [post, setPost] = useState(null);
    const [errorProduct, setErrorProduct] = useState(false);
    const [errorAmount, setErrorAmount] = useState(false); 
    const [getProduct, setGetProduct] = useState(null);
    const [formInput, setFormInput] = useState({
        product: '',
        amount: ''
    });

    const form = useRef(null);

    const apiKey = import.meta.env.VITE_API_KEY;
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    useEffect(() => {
        axios.get(`${API}/products`, { headers })
            .then((response) => {
                setGetProduct(response.data);
            });
    }, []);

    useEffect(()=>{
        if(post){
            if(post.status === 201){
                successAlert("Todo bien!", "Producto guardado!");
            } else if(post.status !== 201){
                errorAlert('Producto NO guardado, intente de nuevo');
            }
        }
    },[post]);

    const newRecord = (product, amount) => {
        let producto = searchProduct(product, getProduct)

        axios.post(`${API}/returned-products`, {
            saleId: Id,
            productId: producto,
            amount: amount
        }, { headers })
        .then((response)=>{setPost(response)})
        .catch((error) => {
            if (error.response) {
                console.log("Error response data:", error.response.data);
                setPost(error);
            } else if (error.request) {
                console.log("Error request:", error.request);
                setPost(error);
            } else {
                console.log("Error message:", error.message);
                setPost(error);
            }
        })
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormInput({
        ...formInput,
        [name]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const record = {
            'product': formData.get('product'),
            'amount': formData.get('amount'),
        }
        if(record.product === ''){
            setErrorProduct(true)
        }
        else if(record.amount === '')
        {
            setErrorAmount(true)
        }
        else 
        {
            setErrorProduct(false);
            setErrorAmount(false);        
            newRecord(record.product, record.amount);
            setFormInput({
                product: '',
                amount: ''
            })
        }
    };

    return (
        <section className="mx-auto relative max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
            <button 
                type='button' 
                className='absolute top-3 left-5 hover:scale-110' 
                onClick={handlePrevStep}
            >
                <i className="fa-solid fa-arrow-left text-2xl lg:text-3xl text-side hover:text-liner-color "></i>
            </button>
            <section className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-strong-blue sm:text-3xl">
                    Cambios
                </h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Ingrese el producto y la cantidad de producto que se cambio.
                </p>

                <form
                    className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
                    ref={form}
                    onSubmit={handleSubmit}
                >

                    <p className="text-center text-lg font-medium text-orange-400 ">Producto cambiado</p>

                    <div>
                        <label htmlFor="product" className="sr-only">Producto</label>
                        <input
                            type="text"
                            className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md outline-created ${errorProduct ? 'placeholder-Error' : ''}`}
                            placeholder="Ingrese el producto"
                            name='product'
                            id='product'
                            value={formInput.product}
                            onChange={handleInput}
                        />
                    </div>

                    <div>
                        <label htmlFor="amount" className="sr-only">Cantidad</label>
                        <input
                            type="number"
                            className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md outline-created ${errorAmount ? 'placeholder-Error' : ''}`}
                            placeholder="Ingrese la cantidad"
                            name='amount'
                            id='amount'
                            value={formInput.amount}
                            onChange={handleInput}
                        />
                    </div>

                    <div className='w-full flex justify-around'>
                        <button
                            type="submit"
                            className="w-2/5 rounded-lg text-base border  border-orange-button bg-orange-button px-5 py-3 font-medium text-white hover:text-created hover:border-created hover:bg-white"
                        >
                            Agregar
                        </button>
                        <button
                            type="button"
                            className="w-2/5 rounded-lg text-base border  border-orange-button bg-orange-button px-5 py-3 font-medium text-white hover:text-created hover:border-created hover:bg-white"
                            onClick={handleNextStep}
                        >
                            Siguiente
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
}

export default ReturnedProducts;