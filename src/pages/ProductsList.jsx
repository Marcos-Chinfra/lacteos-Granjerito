import React, { useState, useEffect, useContext } from 'react';
import ProductsRegister from '../components/modalsComponents/ProductsRegister'
import AppContext from '../context/AppContext';
import {Link} from 'react-router-dom';
import axios  from 'axios';

const ProductsList = () => {
    const { setSendId, API, getToken, SyncLoader } = useContext(AppContext);
    const [ product, setProduct ] = useState(null);
    const [ register, setRegister ] = useState(false);
    const [categoría, setCategoría] = useState(null);

    const apiKey = import.meta.env.VITE_API_KEY
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    const override =  {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        margin: "20px auto",
        height: "60px"
    };

    useEffect(() => {
    axios.get(`${API}/products`, { headers })
        .then((response) => {
            setProduct(response.data);
        });

        axios.get(`${API}/categories`, { headers })
        .then((response) => {
            setCategoría(response.data);
        });

    }, [register]);



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

        if(valorSeleccionado === 'All'){
            axios.get(`${API}/products`, { headers })
            .then((response) => {
                setProduct(response.data);
            });
        }else{
            axios.get(`${API}/products?category=${category}`, { headers })
            .then((response) => {
                setProduct(response.data);
            });
        }

    };

    const ModalIsOpen = () => {
        setRegister(true)
    }

    const ModalOnClose = () => {
        setRegister(false)
    }


    return (
        <div className='h-full w-full lg:w-4/5 flex p-10 overflow-y-auto flex-col '>
            <section className='flex w-full h-4  items-center relative'>
                <label className='mr-2' htmlFor="opciones">Categorías:</label>
                <select id="opciones" name="opciones" onChange={handleSelectChange}>
                    <option value="All">Todos</option>
                    <option value="Quesos">Quesos</option>
                    <option value="Cremas">Cremas</option>
                    <option value="Requesones">Requesones</option>
                    <option value="Mantequillas">Mantequillas</option>
                    <option value="Yogurts">Yogurts</option>
                    <option value="Varios">Varios</option>
                </select>
                <button
                    onClick={ModalIsOpen}
                    className='flex items-center absolute top-0 right-0 justify-center text-center border rounded-lg bg-side px-2 py-3 max-w-button text-Magnolia hover:bg-Magnolia hover:text-side hover:border-side'
                >
                    Registrar
            </button>
            </section>
            <h1 className='font-bold text-xl text-gray-600 my-3'>Productos</h1>
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
                <SyncLoader color='#11aaff'  cssOverride={override}/>}
            </main>
            { register &&
                <ProductsRegister isOpen={register}   onClose={ModalOnClose}/>
            }
        </div>
    );
}

export default ProductsList;