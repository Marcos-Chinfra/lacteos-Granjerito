import React,  {useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';

const FormUpdate = ({ itemId, API }) => {

    const [getRecord, setGetRecord] = useState(null);
    const [amount, setAmount] = useState(null);

    useEffect(() => {
        axios.get(`${API}/unsold-products/${itemId}`)
            .then((response) => {
                setGetRecord(response.data);
            });
    }, []);

    console.log(getRecord)
    return (
        <>
        {getRecord &&
            <section className='w-full max-w-updateForm border mt-2 divide-y-2 divide-created bg-white text-sm'>
                <header className='flex flex-col items-start px-5 md:p-4 py-4 gap-2'>
                    <h1 className='mx-auto text-lg'>Datos</h1>
                    <h3>{`Producto: ${getRecord.product.name}`}</h3>
                    <span>{`Precio: Q.${getRecord.product.price}`}</span>
                    <span>{`Presentación: ${getRecord.product.weight} ${getRecord.product.unit_of_measurement}`}</span>
                    <span className=''>
                        {`cantidad registrada: ${getRecord.amount}`}
                        <button 
                            className='text-blue-500 ml-5'
                            onClick={() => setAmount(!amount)}
                        >
                            Cambiar
                        </button>
                    </span>
                </header>
                {amount && 
                    <form 
                        className='px-4 py-2 flex w-full justify-between'
                    >
                        <section className='flex flex-col w-2/3'>
                            <label 
                                htmlFor="update"
                                className='text-xs'
                            >Nueva cantidad:</label>
                            <input type="number" id="update" name='updateS' className='bg-orange-100 w-full p-1' />
                        </section>
                        <button className='w-1/6 text-created'>Enviar</button>
                    </form>
                }
            </section>
        }
        </>

    );
}

export default FormUpdate;