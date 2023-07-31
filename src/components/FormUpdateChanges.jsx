import React, {useState, useEffect, useContext, useRef} from 'react'; 
import axios from 'axios';

const FormUpdateChanges = ({ itemId, API, setUpdateChanges}) => {

    const [getRecord, setGetRecord] = useState(null);
    const [amount, setAmount] = useState(null);
    const [updateData, setUpdateData] = useState(null)
    const form = useRef(null);

    useEffect(() => {
        axios.get(`${API}/returned-products/${itemId}`)
            .then((response) => {
                setGetRecord(response.data);
            });
    }, []);

    useEffect(() => {
        axios.get(`${API}/returned-products/${itemId}`)
            .then((response) => {
                setGetRecord(response.data);
            });
    }, [updateData]);

    const updateItem = (amount) => {
        axios.patch(`${API}/returned-products/${itemId}`, {
            amount: amount
        })
        .then((response)=>{setUpdateData(response.data)})
        .catch((error) => {
            if (error.response) {
                console.log("Error response data:", error.response.data);
            } else if (error.request) {
                console.log("Error request:", error.request);
            } else {
                console.log("Error message:", error.message);
            }
        })
    };

    const deleteItem = () => {
        axios.delete(`${API}/returned-products/${itemId}`)
        .then(()=>{
            alert("Product deleted!");
            setUpdateChanges(false)
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const record = {
            'update': formData.get('update'),
        }
        updateItem(record.update);
        setAmount(!amount)
    };

    return (
        <>
        {getRecord &&
            <section className='w-full max-w-updateForm border border-return mt-2 bg-white text-sm shadow rounded relative'>
                <section className='absolute top-3 right-6 text-Error'>
                    <button 
                        className='hidden sm:inline-block text-base font-semibold'
                        onClick={() => deleteItem()}
                    >
                        Eliminar
                    </button>
                    <button 
                        className='sm:hidden text-lg font-semibold'
                        onClick={() => deleteItem()}
                    >
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                </section>
                <section className='absolute top-3 left-6 text-side'>
                    <button 
                        className='hidden sm:inline-block text-base font-semibold'
                        onClick={()=>setUpdateChanges(null)}
                    >
                        Atrás
                    </button>
                    <button 
                        className='sm:hidden text-lg font-semibold'
                        onClick={()=>setUpdateChanges(null)}
                    >
                        <i className="fa-solid fa-reply"></i>
                    </button>
                </section>
                <header className='flex flex-col items-start px-5 md:p-4 py-4 pt-6'>
                    <h1 className='mx-auto text-lg font-semibold  text-orange-title'>Datos</h1>
                    <ul className='flex flex-col gap-2 w-full'>
                        <li className='text-base text-liner-color'>
                            Producto: 
                            <span className='text-sm ml-2 text-gray-600 underline'>{`${getRecord.product.name}`}</span>
                        </li>
                        <li className='text-base text-liner-color'>
                            Precio:
                            <span className='text-sm ml-2 text-gray-500'>{`Q.${getRecord.product.price}`}</span>
                        </li>
                        <li className='text-base text-liner-color'>
                            Presentación:
                            <span className='text-sm ml-2 text-gray-500'>{`${getRecord.product.weight} ${getRecord.product.unit_of_measurement}`}</span>
                        </li>
                        <li className='text-base text-liner-color block'>
                            cantidad registrada: 
                            <span 
                                className='text-sm ml-2 text-gray-500 inline-block'
                            >
                                {`${getRecord.amount}`}
                                <button 
                                    className='text-created ml-5 hidden sm:inline-block'
                                    onClick={() => setAmount(!amount)}
                                >
                                    Cambiar
                                </button>
                            </span>
                            <button 
                                className='sm:hidden text-lg w-1/4 text-side '
                                onClick={() => setAmount(!amount)}
                            >
                                <i 
                                    className="fa-solid fa-screwdriver-wrench mx-auto">
                                </i>
                            </button>
                        </li>
                    </ul>



                </header>
                {amount && 
                    <form 
                        className='px-4 py-2 flex w-full justify-between'
                        ref={form}
                        onSubmit={handleSubmit}
                    >
                        <section className='flex flex-col w-2/3'>
                            <label 
                                htmlFor="update"
                                className='text-xs text-gray-600'
                            >
                                Nueva cantidad:
                            </label>

                            <input 
                                type="number" 
                                id="update" 
                                name='update' 
                                className='bg-light-blue w-full py-1 px-3 mt-1 outline-none' 
                            />
                        </section>

                        <button 
                            className='w-1/6 text-created mr-2'
                            type='submit'
                        >
                            Enviar
                        </button>
                    </form>
                }
            </section>
        }
        </>
    );
}

export default FormUpdateChanges;