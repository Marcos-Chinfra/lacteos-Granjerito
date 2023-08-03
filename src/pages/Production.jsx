import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../context/AppContext';
import {SyncLoader}  from "react-spinners";
import axios from 'axios';

// const API = "https://powerful-scrubland-84047-e2a369138362.herokuapp.com/api/v1"

const Production = () => {
    const { sendId, API } = useContext(AppContext);
    const [get, setGet] = useState(null);
    const [getProducts, setGetProducts] = useState(false)

    // useEffect(() => {
    //     axios.get(`${API}/shift-output`)
    //     .then((response) => {setGet(response.data)})
    //     .catch((err) => console.error(err))
    // }, []);

    useEffect(() => {
        async function getPost() {
            const response = await axios.get(`${API}/shift-output`);
            setGet(response.data);
            const respuesta = await axios.get(`${API}/products/${sendId}`);
            setGetProducts(respuesta.data)
        }
        getPost();
    }, []);

    return (
        <div className='w-screen h-4/5 flex flex-col p-10 items-start gap-10'>
            <section className='bg-Magnolia w-full px-4 py-2 rounded-md shadow flex gap-3 items-center'>
                <main className={`w-3/5 p-2 ${getProducts ? '' : 'flex justify-center items-center'}`}>
                {getProducts
                    ?
                    <>
                    <h1 className='text-2xl font-medium text-gray-700'>{`${getProducts.name}`}</h1>
                    <article className='flex flex-col'>
                        <p className='text-liner-color'>Precio: <span className='text-gray-500'>{`Q.${getProducts.price}`}</span></p>
                        <p className='text-liner-color'>Presentación: <span className='text-gray-500'>{`${getProducts.weight} ${getProducts.unit_of_measurement}`}</span></p>
                        <p className='text-liner-color'>Descripción: <span className='text-gray-500'>{`${getProducts.description}`}</span></p>
                    </article>
                    </>
                    :
                    <SyncLoader className='loader'/>
                }


                    {/* <h1 className='text-2xl font-medium text-gray-700'>Queso fresco</h1>
                    <article className='flex flex-col'>
                        <p className='text-liner-color'>Precio: <span className='text-gray-500'>Q7.5</span></p>
                        <p className='text-liner-color'>Presentación: <span className='text-gray-500'>0.5 libras</span></p>
                        <p className='text-liner-color'>Descripción: <span className='text-gray-500'>Queso fresco de primero calidad</span></p>
                    </article> */}
                </main>
                <button className='bg-white px-4 rounded h-2/4 w-1/5 max-h-14 border border-side text-side shadow hover:bg-light-blue' >
                    Add record
                </button>
                <button className='bg-white px-4 rounded h-2/4 w-1/5 max-h-14 border border-side text-side shadow  hover:bg-light-blue'>
                    Update
                </button>
            </section>

            <table className="border-collapse border border-gray-400 w-full" >
            <thead>
                <tr>
                    <th className="p-2 text-center text-strong-blue border-b">Producto</th>
                    <th className="p-2 text-center text-strong-blue border-b">Elaborados</th>
                    <th className="p-2 text-center text-strong-blue border-b">Jornada</th>
                    <th className="p-2 text-center text-strong-blue border-b">Fecha</th>
                </tr>
            </thead>
            <tbody>
                {get && 
                    get.map((item)=>(
                        <tr key={item.id}>
                            <td className="p-2 text-center text-text-color">
                                {`${item.product.name}`}
                            </td>
                            <td className="p-2 text-center text-text-color">
                                {`${item.amount}`}
                            </td>
                            <td className="p-2 text-center text-text-color">
                                {`${item.workingDay}`}
                            </td>
                            <td className="p-2 text-center text-text-color">
                                {new Date(item.createdAt).toLocaleDateString('es-GT', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                            </td>
                        </tr>
                    ))
                }


                {/* <tr>
                    <td className="p-2 text-gray-600">Celda 1</td>
                    <td className="p-2 text-gray-600">Celda 2</td>
                    <td className="p-2 text-gray-600">Celda 3</td>
                    <td className="p-2 text-gray-600">Celda 4</td>
                </tr>
                <tr>
                    <td className="p-2 text-gray-600">Celda 6</td>
                    <td className="p-2 text-gray-600">Celda 7</td>
                    <td className="p-2 text-gray-600">Celda 8</td>
                    <td className="p-2 text-gray-600">Celda 9</td>
                </tr> */}
            </tbody>
            </table>
        </div>
    );
}

export default Production;