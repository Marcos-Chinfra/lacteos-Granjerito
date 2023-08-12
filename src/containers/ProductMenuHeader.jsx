import React from 'react';
import {SyncLoader}  from "react-spinners";

const ProductMenuHeader = ({ children, getProducts, handleShiftOutput, handleReturn, handleUnsold, cambiados, regresados, fabricados }) => {
    return (
        <>
            <header className='bg-Magnolia w-full px-2 sm:px-4 py-2 rounded-md shadow flex flex-col relative'>
                <section className='w-full flex gap-2 mb-10 items-center '>
                    <main className={`w-3/5 p-2 ${getProducts ? '' : 'flex justify-center items-center'}`}>
                    {getProducts
                        ?
                        <>
                            <h1 className='text-xl sm:text-2xl font-medium text-gray-700'>{`${getProducts.name}`}</h1>
                            <article className='flex flex-col'>
                                <p className='text-liner-color  hidden sm:inline-block'>
                                    Precio: 
                                    <span className='text-gray-500 ml-1'>{`Q.${getProducts.price}`}</span>
                                </p>
                                <span className='text-gray-500 mt-1 text-sm sm:hidden'>
                                    {`Q.${getProducts.price}`}
                                </span>

                                <p className='text-liner-color hidden sm:inline-block'>
                                    Presentación: 
                                    <span className='text-gray-500 ml-1'>
                                        {`${getProducts.weight} ${getProducts.unit_of_measurement}`}
                                    </span>
                                </p>
                                <span className='text-gray-500 mt-1 text-sm sm:hidden'>
                                        {`${getProducts.weight} ${getProducts.unit_of_measurement}`}
                                </span>

                                <p className='text-liner-color hidden sm:inline-block'>
                                    Descripción: 
                                    <span 
                                        className='text-gray-500 ml-1'>
                                            {`${getProducts.description}`}
                                    </span>
                                </p>
                                <span className='text-gray-500 mt-1 text-xs sm:hidden'>
                                    {`${getProducts.description}`}
                                </span>
                            </article>
                        </>
                        :
                        <SyncLoader color='#11aaff'/>
                    }

                    </main>

                    <button className='bg-white rounded text-xs sm:text-base sm:px-4  w-1/5 max-h-14 min-h-buttons border border-Error text-Error shadow hover:bg-return' >
                        Eliminar
                    </button>

                    <button className='bg-white text-xs sm:text-base sm:px-4 rounded  w-1/5 max-h-14 min-h-buttons border border-side text-side shadow  hover:bg-light-blue'>
                        Editar
                    </button>
                </section>

                <div className="w-2/5 max-w-buttons inline-flex rounded-lg bg-Magnolia  absolute menu-header-options">
                    <button
                        className={`inline-block rounded-t  px-4 py-2 text-sm ${regresados ? 'border-white bg-white text-created border-b-4 z-10' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => {handleUnsold()}}
                    >
                        Regresos
                    </button>

                    <button
                        className={`inline-block rounded-t px-4 py-2 text-sm ${cambiados ? 'border-white bg-white  text-created border-b-4 z-10' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => {handleReturn()}}
                    >
                        Cambios
                    </button>

                    <button
                        className={`inline-block rounded-t  px-4 py-2 text-sm ${fabricados ? 'border-white bg-white text-created border-b-4 z-10' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => {handleShiftOutput()}}
                    >
                        Producción
                    </button>
                </div>                
            </header>


            <main className='w-full overflow-x-auto'>
                {children}
            </main>
        </>
    );
}

export default ProductMenuHeader;