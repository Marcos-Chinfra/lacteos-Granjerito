import React, {useState, useEffect, useContext, useRef} from 'react';
import axios from "axios";
import FormUpdate from './FormUpdate';

const SoldProducts = ({ handlePrevStep, API, Id }) => {
    const [post, setPost] = useState(null);
    const [total, setTotal] = useState(null)
    const [getProduct, setGetProduct] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        axios.get(`${API}/sales/${Id}`)
            .then((response) => {
                setGetProduct(response.data);
            });
    }, []);


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
        setTotal(sum)
    };

    const handleUpdate = (id) => {
        setItemId(id)
        setUpdate(!update)
    }


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
                        <FormUpdate itemId={itemId} API={API}/>   
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
                                                href="#"
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
                                            <a
                                                href="#"
                                                className="inline-block rounded border bg-created border-created px-4 py-2 text-xs font-medium text-white hover:text-side hover:border-orange-300 hover:bg-white "
                                            >
                                                View
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
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
                        <button className=' rounded bg-white border px-4 py-3 border-orange-300 text-side hover:text-white hover:bg-created hover:border-created'>
                            Guardar
                        </button>
                    </article>
                }
            </div>
        </section>
    );
}

export default SoldProducts;