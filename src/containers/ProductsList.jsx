import React, { useState, useEffect } from 'react';
import axios  from 'axios';

const API = "https://powerful-scrubland-84047-e2a369138362.herokuapp.com/api/v1/products";

const ProductsList = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
    axios.get(API)
        .then((response) => {
            setProduct(response.data);
        });
    }, []);
    if (!product) return console.error('no funciona');
    console.log(product)

    return (
        <div className='h-full w-full lg:w-4/5 flex p-10 overflow-y-auto flex-col '>
            <section className='flex w-full h-4  items-center'>
                <label className='mr-2' htmlFor="opciones">Categorías:</label>
                <select id="opciones" name="opciones">
                    <option value="All">All</option>
                    <option value="Quesos">Quesos</option>
                    <option value="Cremas">Cremas</option>
                    <option value="Requesones">Requesones</option>
                    <option value="Mantequillas">Mantequillas</option>
                    <option value="Yogurts">Yogurts</option>
                    <option value="Varios">Varios</option>
                </select>
            </section>
            <h1 className='font-bold text-xl text-gray-600 my-3'>Products</h1>
            <main className='w-full flex flex-wrap'>
                {product 
                ? 
                product.map(item => (
                        <article className='w-60 h-64 my-4 border flex items-center justify-end p-2 flex-col mx-auto'>
                            <h2 className='text-xl font-semibold' key={item.id}>{item.name}</h2>
                            <p className='text-center text-base'>{item.description}</p>
                            <span className='text-sm text-gray-400'>Q{item.price}</span>
                        </article>
                    ))
                : 
                <h2>Cargando</h2>}
            </main>
        </div>
    );
}

export default ProductsList;