import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import {Link} from 'react-router-dom';
import axios  from 'axios';

const ProductsList = () => {
    const { sendId ,setSendId, API } = useContext(AppContext);
    const [ product, setProduct ] = useState(null);
    const [categoría, setCategoría] = useState(null);

    useEffect(() => {
    axios.get(`${API}/products`)
        .then((response) => {
            setProduct(response.data);
        });

        axios.get(`${API}/categories`)
        .then((response) => {
            setCategoría(response.data);
        });

    }, []);



    const searchCategory = (name, arr) => { 
        try{
            let product =  arr.find(item => item.name === name);
            if(product){
                return product.id
            }else{
                return null
            }
        }catch(error){
            console.error("Error al buscar el producto: " , error);
            errorAlert('El producto no se puede encontrar en la base de datos');
            return null
        }
    };



    const handleSelectChange = (event) => {
        const valorSeleccionado = event.target.value;
        const category = searchCategory(valorSeleccionado, categoría);

        axios.get(`${API}/products?category=${category}`)
        .then((response) => {
            setProduct(response.data);
        });

    };


    return (
        <div className='h-full w-full lg:w-4/5 flex p-10 overflow-y-auto flex-col '>
            <section className='flex w-full h-4  items-center'>
                <label className='mr-2' htmlFor="opciones">Categorías:</label>
                <select id="opciones" name="opciones" onChange={handleSelectChange}>
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
                        <article 
                            className='w-60 h-64 my-4 border flex items-center justify-end p-2 flex-col mx-auto'
                            key={item.id}
                        >
                            <Link 
                                to={'/production'}
                                onClick={()=>setSendId(item.id)}
                            >
                                <h2 className='text-xl font-semibold'>{item.name}</h2>
                            </Link>
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