import React, {useState ,useRef} from 'react';

const Step2 = ({ handlePrevStep }) => {

    const [errorProduct, setErrorProduct] = useState(false);
    const [errorQuantity, setErrorQuantity] = useState(false);
    const [formData, setFormData] = useState({
        product: '',
        quantity: ''
    });
    const form = useRef(null);

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
        console.log(record)
    }

    return (
        <div className='w-4/5 max-w-lg bg-white flex flex-col p-5 justify-start items-center shadow relative'>
            <button type='button' className='absolute top-2 left-3 hover:scale-110' onClick={handlePrevStep}>
                <i className="fa-solid fa-arrow-left text-side hover:text-liner-color "></i>
            </button>
            <form 
                className=' flex flex-col justify-start items-center' 
                ref={form} 
                onSubmit={handleSubmit}
            >
                <section 
                    className='flex w-full'
                >
                    <div 
                        className='flex flex-col w-3/5 px-3'
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
                        className='flex flex-col w-2/5 px-3'
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
        </div>
    );
}

export default Step2;