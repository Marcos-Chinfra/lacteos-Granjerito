import React from 'react';

const Step2 = () => {
    return (
        <form action="" className='w-4/5 max-w-lg bg-white flex flex-col p-5 justify-start items-center shadow'>
                <section className='flex w-full'>
                    <div className='flex flex-col w-3/5 px-3'>
                        <label className='py-2 text-lg mt-4 text-created  font-medium' htmlFor='product'>Producto</label>
                        <input className='border outline-gray-400 rounded px-2 py-3 text-sm text-text-color' id='product' type="text" name="product" placeholder='e.g Queso fresco' />
                    </div>

                    <div className='flex flex-col w-2/5 px-3'>
                        <label className='py-2 text-lg mt-4 text-created font-medium' htmlFor='quantity'>Cantidad</label>
                        <input className='border  outline-gray-400 rounded px-2 py-3 font-medium text-sm text-text-color' id='quantity' type="number" name="quantity" placeholder='e.g 420' />
                    </div>
                </section>

                <button className='text-orange-300 mt-3 bg-white w-32 h-10 border border-orange-300 rounded hover:bg-button' >Guardar</button>


            </form>
    );
}

export default Step2;