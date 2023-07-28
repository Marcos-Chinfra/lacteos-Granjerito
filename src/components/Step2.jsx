import React, {useState ,useRef, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Step2 = ({ handlePrevStep, API, postId }) => {

    const [errorProduct, setErrorProduct] = useState(false);
    const [errorQuantity, setErrorQuantity] = useState(false);
    const [getProduct, setGetProduct] = useState(null);
    const [post, setPost] = useState(null);
    const [listProducts, setListProducts] = useState([]);
    const [formData, setFormData] = useState({
        product: '',
        quantity: ''
    });
    const form = useRef(null);

    useEffect(() => {
        axios.get(`${API}/products`)
            .then((response) => {setGetProduct(response.data)});
    }, []);

    useEffect(() => {
        if(post && postId){
            axios.get(`${API}/sales/${postId.id}`)
            .then((response) => {setListProducts(response.data.GoodsInTransit)});
        }
    }, [post]);

    console.log(listProducts);

    const searchProduct = (name, arr) => {
        let product =  arr.find(item => item.name == name);
        return product.id
    }

    const newRecord = (product, quantity) => {
        let producto = searchProduct(product, getProduct)

        axios.post(`${API}/goods-in-transit`, {
            staffId: postId.staffId,
            saleId: postId.id,
            productId: producto,
            amount: quantity
        })
        .then((response)=>{setPost(response.data)})
        .catch((error) => {
            if (error.response) {
                console.log("Error response data:", error.response.data);
            } else if (error.request) {
                console.log("Error request:", error.request);
            } else {
                console.log("Error message:", error.message);
            }
        })
    }



    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form.current);
        const record = {
            'product': formData.get('product'),
            'quantity': formData.get('quantity'),
        }
        if(record.product === ''){
            setErrorProduct(true)
        }
        else if(record.quantity === '')
        {
            setErrorQuantity(true)
        }
        else 
        {
            setErrorProduct(false)
            setErrorQuantity(false)
            setFormData({
                product: '',
                quantity: ''
            })
        }
        newRecord(record.product, record.quantity )
    }

    return (
        <>
        <div className='w-4/5 max-w-lg bg-white flex flex-col p-5 justify-start items-center shadow relative overflow-y-auto'>
            <button type='button' className='absolute top-2 left-3 hover:scale-110' onClick={handlePrevStep}>
                <i className="fa-solid fa-arrow-left text-side hover:text-liner-color "></i>
            </button>
            <form 
                className=' flex flex-col w-full justify-start items-center' 
                ref={form} 
                onSubmit={handleSubmit}
            >
                <section 
                    className='flex flex-col lg:flex-row w-full'
                >
                    <div 
                        className='flex flex-col w-full lg:w-3/5 px-3'
                    >
                        <label 
                            className='py-2 text-lg mt-4 text-created  font-medium' 
                            htmlFor='product'
                        >
                            Producto
                        </label>
                        <input 
                            className={`border outline-gray-400 rounded px-2 py-3 text-sm text-text-color ${errorProduct ? 'border-Error' : ''}`} 
                            id='product' 
                            type="text" 
                            name="product" 
                            placeholder='e.g Queso fresco' 
                            value={formData.product}
                            onChange={handleInput}
                        />
                    </div>

                    <div 
                        className='flex flex-col w-full lg:w-2/5 px-3'
                    >
                        <label 
                            className='py-2 text-lg mt-4 text-created font-medium' 
                            htmlFor='quantity'
                        >
                            Cantidad
                        </label>
                        <input  
                            className={`border  outline-gray-400 rounded px-2 py-3 font-medium text-sm text-text-color ${errorQuantity ? 'border-Error' : ''}`} 
                            id='quantity' 
                            type="number" 
                            name="quantity" 
                            placeholder='e.g 420' 
                            value={formData.quantity}
                            onChange={handleInput}
                        />
                    </div>
                </section>

                <button 
                    className='text-orange-300 mt-3 bg-white w-32 h-10 border border-orange-300 rounded hover:bg-button'
                    type='submit'
                >
                    Guardar
                </button>
            </form>

            {post && 
                <table 
                className=" w-3/4 p-2 border-collapse border border-side bg-Magnolia mt-6"
            >
                <thead>
                    <tr>
                        <th 
                            className="px-2 py-3 text-center text-orange-300 border-b text-lg"
                        >
                            Producto
                        </th>
                        <th 
                            className="px-2 py-3 text-center text-orange-300 border-b text-lg"
                        >
                            Cantidad
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts.map((item) => (
                        <tr key={item.id}>
                            <td 
                                className="p-2 text-center text-text-color"
                            >
                                {`${item.product.name}`}
                            </td>
                            <td 
                                className="p-2 text-center text-text-color"
                            >
                                {`${item.amount} `}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            
        </div>
        <Link to="/sales" className='bottom-4 left-5 lg:bottom-10 lg:left-16 absolute bg-side py-2 px-4 rounded text-button'>
            Listo
            </Link> 
        </>
        
    );
}

export default Step2;