import React from 'react';

const UnSoldProducts = () => {
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-strong-blue sm:text-3xl">
                    Regresos
                </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                Ingrese los productos que regresaron, los que no se vendieron.
            </p>

            <form
                className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
            >
                <p className="text-center text-lg font-medium text-orange-400 ">Producto regresado</p>

                <div>
                    <label htmlFor="product" className="sr-only">Producto</label>
                    <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
                        placeholder="Ingrese el producto"
                        name='product'
                        id='product'
                    />
                </div>

                <div>
                    <label htmlFor="amount" className="sr-only">Cantidad</label>
                    <input
                        type="number"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
                        placeholder="Ingrese la cantidad"
                        name='amount'
                        id='amount'
                    />
                </div>

                <button
                    type="submit"
                    className="block w-full rounded-lg text-base border  border-orange-button bg-orange-button px-5 py-3 font-medium text-white hover:text-created hover:border-created hover:bg-white"
                >
                    Siguiente
                </button>

            </form>
        </div>
</div>
    );
}

export default UnSoldProducts;