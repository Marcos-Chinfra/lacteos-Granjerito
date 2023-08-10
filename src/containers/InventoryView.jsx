import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import BartChart from '../components/BartChart';
import AppContext from '../context/AppContext';
import InventoryTable from '../components/InventoryTable';

const InventoryView = ({API}) => {
    const { searchProduct, successAlert, errorAlert, SyncLoader, sortDirection, handleSortChange } = useContext(AppContext)
    const [getProduct, setGetProduct] = useState(null);
    const [getInventory, setGetInventory] = useState(null);
    const [post ,setPost] = useState(null);
    const [errorProduct, setErrorProduct] = useState(false);
    const [errorIncomings, setErrorIncomings] = useState(false);
    const [errorWithdrawals, setErrorWithdrawals] = useState(false);
    const [errorErrorStock, setErrorStock] = useState(false);
    const [inputData, setInputData] = useState({
        product: '',
        incomings: '',
        withdrawals: '',
        stock: ''
    });
    const form = useRef(null);

    const override =  {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        margin: "20px 0",
        height: "60px"
    };

    useEffect(()=>{
        axios.get(`${API}/inventory`)
            .then((response)=>{setGetInventory(handleSortChange(response.data))})
            .catch((err)=>{console.error(err)})

        axios.get(`${API}/products`)
            .then((response) => {setGetProduct(response.data)});
    },[]);

    useEffect(() => {
        if(post){
            if(post.status === 201){
                successAlert('Todo bien!!', 'El registro se a guardado con éxito.')
            }else if(post.status !== 201){
                errorAlert('No se ha registrado en el inventario.');
            }
        }
    }, [post]);

    const createdRecord = (producto, entradas, salidas, save )=> {
        let item = searchProduct(producto, getProduct)

        axios.post(`${API}/inventory`, {
            productId: item,
            incomings: entradas,
            withdrawals: salidas,
            stock: save
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
            'product': formData.get('product'),
            'incomings': formData.get('incomings'),
            'withdrawals': formData.get('withdrawals'),
            'stock': formData.get('stock'),
        }
        console.log(record)
        if(record.product === ''){
            setErrorProduct(true)
        }
        else if(record.incomings === '')
        {
            setErrorIncomings(true)
        }
        else if(record.withdrawals === '')
        {
            setErrorWithdrawals(true)
        }
        else if(record.stock === '')
        {
            setErrorStock(true)
        }
        else 
        {
            setErrorProduct(false)
            setErrorIncomings(false)
            setErrorStock(false)
            setErrorWithdrawals(false)
            setInputData({
                product: '',
                incomings: '',
                withdrawals: '',
                stock: ''
            })
            createdRecord(record.product, record.incomings, record.withdrawals, record.stock )
        }
    }

    return (
        <main className='w-full flex flex-col md:flex-row '>        
            <section className='w-full md:w-1/2 md:px-4  '>
                {getInventory 
                ? 
                <div className='max-w-tables mx-auto relative overflow-x-auto'>
                    <div className='w-full flex justify-center my-2'>
                        <button className='absolute left-0' onClick={()=>handleSortChange(getInventory)}>
                            {sortDirection === 'asc' 
                            ? 
                                <i className="fa-solid fa-arrow-up-long text-lg text-side hover:text-liner-color"></i> 
                            : 
                                <i className="fa-solid fa-arrow-down-long text-lg text-side hover:text-liner-color"></i>
                            }
                        </button>
                        <h1>
                            Inventario
                        </h1>
                        <a 
                            className='absolute right-0 top-0 text-xs py-1 px-2 bg-created rounded text-white md:hidden'
                            href='#formulario'
                        >
                            Registrar
                        </a>
                    </div>
                    <InventoryTable getInventory={getInventory} />
                </div>
                : 
                    <SyncLoader color='#11aaff'  cssOverride={override} />}
            </section>
            
            <article className='w-full md:w-1/2 md:px-3 mt-5 md:mt-0'>
                <BartChart />
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

                    <label htmlFor="Incomings" className="sr-only "> Entradas </label>
                    <input
                        type="number"
                        id="Incomings"
                        name='incomings'
                        placeholder="Entradas"
                        value={inputData.incomings}
                        onChange={handleInput}
                        className={`w-full mt-2 p-2 lg:p-3 rounded-md  border shadow-sm text-sm sm:text-md outline-none ${errorIncomings ? 'border-Error' : 'border-gray-200'}`}
                    />
                    <label htmlFor="Withdrawals" className="sr-only mt-2"> Salidas </label>
                    <input
                        name='withdrawals'
                        type="number"
                        id="Withdrawals"
                        value={inputData.withdrawals}
                        onChange={handleInput}
                        placeholder="Salidas"
                        className={`w-full mt-2 p-2 lg:p-3 rounded-md  border shadow-sm text-sm sm:text-md outline-none ${errorWithdrawals ? 'border-Error' : 'border-gray-200'}`}
                    />
                    <label htmlFor="Stock" className="sr-only"> Stock </label>
                    <input
                        name='stock'
                        type="number"
                        id="Stock"
                        placeholder="Stock"
                        value={inputData.stock}
                        onChange={handleInput}
                        className={`w-full mt-2 p-2 lg:p-3 rounded-md  border shadow-sm text-sm sm:text-md outline-none ${errorErrorStock ? 'border-Error' : 'border-gray-200'}`}
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

export default InventoryView;