import React, {useState, useEffect, useContext, useRef} from 'react';
import axios from "axios";
import AppContext from '../context/AppContext';

const SoldProducts = ({ handlePrevStep, API, Id }) => {
    const [post, setPost] = useState(null);
    const [total, setTotal] = useState(null)
    const [getProduct, setGetProduct] = useState(null);

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
        console.log(total)
    };


    return (
        <section className='flex flex-col w-full max-w-2xl pt-16 sm:mt-0 '>
            <button 
                type='button' 
                className='absolute top-3 left-5 hover:scale-110' 
                onClick={handlePrevStep}
            >
                <i className="fa-solid fa-arrow-left text-2xl lg:text-3xl text-side hover:text-liner-color "></i>
            </button>
            <article className='flex flex-col items-center gap-5 sm:justify-between sm:flex-row'>
                <table className="w-2/5 divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Producto
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Cantidad
                        </th>
                        <th className="px-4 py-2"></th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                    <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            queso
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24</td>

                        <td className="whitespace-nowrap px-4 py-2">
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                            >
                                View
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table className="w-2/5 divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Producto
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Cantidad
                            </th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Queso
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">5</td>

                        <td className="whitespace-nowrap px-4 py-2">
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                            >
                                View
                            </a>
                        </td>
                </tr>

            </tbody>
                </table>
            </article>
            <div className='table-responsive overflow-x-auto'>
                <table className="min-w-full  divide-y-2 mt-10 divide-gray-200 bg-white text-sm">
                    <thead className="text-left">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Producto
                            </th>
                            <th className="whitespace-nowrap hidden sm:table-cell col-span-2 px-4 py-2 font-medium text-gray-900">
                                Llevo
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Vendió
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Total
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        { getProduct &&
                            getProduct.SoldProducts.map((item, index) => (
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
                        <button className=' rounded bg-white border px-4 py-3 border-orange-300 text-side'>
                            Guardar
                        </button>
                    </article>
                }
            </div>
        </section>
    );
}

export default SoldProducts;