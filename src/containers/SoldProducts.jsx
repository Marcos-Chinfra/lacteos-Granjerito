import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import AppContext from '../context/AppContext';
import FormUpdate from '../components/FormUpdate';
import FormUpdateChanges from '../components/FormUpdateChanges';

const SoldProducts = ({ handlePrevStep, API, Id }) => {
    const { saveAlert, errorAlert, getToken } = useContext(AppContext);
    const [total, setTotal] = useState(null)
    const [getProduct, setGetProduct] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [update, setUpdate] = useState(false);
    const [updateChanges, setUpdateChanges] = useState(null);
    const [totalData ,setTotalData] = useState(null);
    const apiKey = import.meta.env.VITE_API_KEY;
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    useEffect(() => {
        axios.get(`${API}/sales/${Id}`, { headers })
            .then((response) => {
                setGetProduct(response.data);
            });
    }, []);

    useEffect(() => {
        axios.get(`${API}/sales/${Id}`, { headers })
            .then((response) => {
                setGetProduct(response.data);
            });
    }, [update]);

    useEffect(() => {
        axios.get(`${API}/sales/${Id}`, { headers })
            .then((response) => {
                setGetProduct(response.data);
            });
    }, [updateChanges]);

    useEffect(() => {
        if(totalData){
            if(totalData.status === 201){
                saveAlert('sales', 'Venta guardada con éxito', 'Todo bien!!', 'ventas')
            }else if(totalData.status !== 201){
                errorAlert('La venta no se puedo actualizar');
            }
        }
    }, [totalData]);

    useEffect(() => {
        if(getProduct){
            cierre()
        }
    }, [getProduct])

    const cierre = () => {
        let ganancia =  getProduct.SoldProducts.map((item) => (item.amount * item.product.price))
        let sum = ganancia.reduce((prev, item) => {
            return prev + item
        })
        setTotal(Number(sum))
    };

    const handleUpdate = (id) => {
        setItemId(id)
        setUpdate(!update)
    }

    const handleUpdateChanges = (id) => {
        setItemId(id)
        setUpdateChanges(!update)
    }

    const updateTotal = () => {
        axios.patch(`${API}/sales/${Id}`, {
            total: total
        }, { headers })
        .then((response)=>{setTotalData(response)})
        .catch((error) => {
            if (error.response) {
                console.log("Error response data:", error.response.data);
                setTotalData(error)
            } else if (error.request) {
                console.log("Error request:", error.request);
                setTotalData(error)
            } else {
                console.log("Error message:", error.message);
                setTotalData(error)
            }
        })
    };


    return (
        <section className='flex flex-col w-full max-w-3xl pt-16 sm:mt-0 '>
            <button 
                type='button' 
                className='absolute top-3 left-5 hover:scale-110' 
                onClick={handlePrevStep}
            >
                <i className="fa-solid fa-arrow-left text-2xl lg:text-3xl text-side hover:text-liner-color "></i>
            </button>

            <article className='flex flex-col items-center md:justify-between md:flex-row gap-6 md:gap-4 '>

                <div className='w-4/5 md:w-2/5 flex flex-col items-center'>
                    <h2 className='text-2xl font-base text-strong-blue' >Regresos</h2>
                    {update
                    ?
                        <FormUpdate itemId={itemId} API={API} setUpdate={setUpdate}/>   
                    :                   
                    <table className="w-full mt-2 divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-center ">
                            <tr>
                                <th className="whitespace-nowrap px-5 py-2 text-base font-semibold text-orange-title ">
                                    Producto
                                </th>
                                <th className="whitespace-nowrap px-5 py-2 text-base font-semibold text-orange-title">
                                    Cantidad
                                </th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 text-center">
                            {getProduct 
                                && getProduct.UnsoldProducts.map((item)=>(
                                    <tr key={item.id}>
                                        <td 
                                            className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                        >
                                            {`${item.product.name}`}
                                        </td>
                                        <td 
                                            className="whitespace-nowrap px-4 py-2 text-gray-700"
                                        >
                                            {`${item.amount}`}
                                        </td>

                                        <td 
                                            className="whitespace-nowrap px-4 py-2"
                                        >
                                            <button
                                                type='button'
                                                className="inline-block rounded border bg-created border-created px-4 py-2 text-xs font-medium text-white hover:text-side hover:border-orange-300 hover:bg-white"
                                                onClick={() => handleUpdate(item.id)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>   
                                ))
                            }
                        </tbody>
                    </table>
                    }
                </div>

                <div className='w-4/5 md:w-2/5  flex flex-col items-center'>
                    <h2 className='text-2xl font-base text-strong-blue'>Cambios</h2> 
                    {updateChanges
                    ?
                        <FormUpdateChanges itemId={itemId} API={API} setUpdateChanges={setUpdateChanges} />   
                    :   
                        <table className="w-full mt-2 divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-center">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 text-base font-semibold text-orange-title">
                                    Producto
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-base font-semibold text-orange-title">
                                    Cantidad
                                </th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 text-center">
                            {getProduct && 
                                getProduct.ReturnedProducts.map((item)=>(
                                    <tr key={item.id}>
                                        <td 
                                            className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                        >
                                                {`${item.product.name}`}
                                        </td>
                                        <td 
                                            className="whitespace-nowrap px-4 py-2 text-gray-700"
                                        >
                                            {`${item.amount}`}
                                        </td>
                                        <td     
                                            className="whitespace-nowrap px-4 py-2"
                                        >
                                            <button
                                                type='button'
                                                className="inline-block rounded border bg-created border-created px-4 py-2 text-xs font-medium text-white hover:text-side hover:border-orange-300 hover:bg-white"
                                                onClick={() => handleUpdateChanges(item.id)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                    }
                </div>
            </article>


            <div className='table-responsive overflow-x-auto mt-10'>
                <h2 className='text-3xl font-base text-strong-blue' >Resumen</h2>
                <table className="min-w-full  divide-y-2  divide-gray-200 bg-white mt-4 text-sm">
                    <thead className="text-left">
                        <tr>
                            <th className="whitespace-nowrap px-5 py-2 text-base font-semibold text-orange-title">
                                Producto
                            </th>
                            <th className="whitespace-nowrap hidden sm:table-cell col-span-2 px-5 py-2 text-base font-semibold text-orange-title">
                                Llevo
                            </th>
                            <th className="whitespace-nowrap px-5 py-2 text-base font-semibold text-orange-title">
                                Vendió
                            </th>
                            <th className="whitespace-nowrap px-5 py-2 text-base font-semibold text-orange-title">
                                Total
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        { getProduct &&
                            getProduct.SoldProducts.map((item) => (
                            <tr key={item.id}>
                                <td 
                                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                >
                                    {`${item.product.name}`}
                                </td>
                                <td 
                                    className="whitespace-nowrap px-4 py-2 text-gray-700 hidden sm:table-cell"
                                >
                                    {getProduct.GoodsInTransit.find((good) => good.productId === item.productId).amount }
                                </td>
                                <td className="whitespace-nowrap  px-4 py-2 text-gray-700">
                                {`${item.amount} `}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                { `${item.amount * item.product.price} `}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {getProduct && 
                    <article className='w-full p-10 flex items-center justify-end gap-7'>
                        <h1 className='text-4xl'>
                            {`Total: ${total}`}
                        </h1>
                        <button 
                            className=' rounded bg-white border px-4 py-3 border-orange-300 text-side hover:text-white hover:bg-created hover:border-created'
                            onClick={() => {updateTotal()}}
                        >
                            Guardar
                        </button>
                    </article>
                }
            </div>
        </section>
    );
}

export default SoldProducts;